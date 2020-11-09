package plugins

import (
	"io"
	"net/url"
	"os"
	"path"
	"strings"
)

type FrontendPluginBase struct {
	PluginBase
}

func (fp *FrontendPluginBase) initFrontendPlugin() {
	fp.IsExternal = isExternalPlugin(fp.PluginDir)
	fp.handleModuleDefaults()

	for i := 0; i < len(fp.Info.Screenshots); i++ {
		fp.Info.Screenshots[i].Path = evalRelativePluginUrlPath(fp.Info.Screenshots[i].Path, fp.BaseUrl)
	}

	fp.Info.Logos.Small = getPluginLogoUrl(fp.Type, fp.Info.Logos.Small, fp.BaseUrl)
	fp.Info.Logos.Large = getPluginLogoUrl(fp.Type, fp.Info.Logos.Large, fp.BaseUrl)
}

func getPluginLogoUrl(pluginType, path, baseUrl string) string {
	if path == "" {
		return "icn-" + pluginType + ".svg"
	}

	return evalRelativePluginUrlPath(path, baseUrl)
}

func (fp *FrontendPluginBase) handleModuleDefaults() {
	fp.BaseUrl = path.Join("plugins", fp.Type, fp.Id)

	if isExternalPlugin(fp.PluginDir) {
		fp.IsCorePlugin = false
		fp.Module = path.Join("src/plugins/external", fp.Type, fp.Id, "module")
		return
	}

	fp.IsCorePlugin = true
	fp.Module = path.Join("src/plugins/built-in", fp.Type, fp.Id, "module")
}

func isExternalPlugin(pluginDir string) bool {
	return strings.Contains(pluginDir, "/external/")
}

func evalRelativePluginUrlPath(pathStr string, baseUrl string) string {
	if pathStr == "" {
		return ""
	}

	u, _ := url.Parse(pathStr)
	if u.IsAbs() {
		return pathStr
	}
	return path.Join(baseUrl, pathStr)
}

func copyFile(dstName, srcName string) (written int64, err error) {
	src, err := os.Open(srcName)
	if err != nil {
		return
	}
	defer src.Close()

	dst, err := os.Create(dstName)
	if err != nil {
		return
	}
	defer dst.Close()

	return io.Copy(dst, src)
}
