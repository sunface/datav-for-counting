import React, { useRef, useState, useEffect } from 'react';
import { PanelProps, DatavTheme } from 'src/packages/datav-core';
import { withTheme } from 'src/packages/datav-core';
import { debounce } from 'lodash';
import echarts from 'echarts';
import { css, cx } from 'emotion';
import { EchartsOptions, funcParams } from './types';

// just comment it if don't need it
import 'echarts-wordcloud';
import 'echarts-liquidfill';
import 'echarts-gl';

// auto register map
const maps = (require as any).context('./map', false, /\.json/);
maps.keys().map((m: string) => {
  const matched = m.match(/\.\/([0-9a-zA-Z_]*)\.json/);
  if (matched) {
    echarts.registerMap(matched[1], maps(m));
  } else {
    console.warn("Can't register map: JSON file Should be named according to the following rules: /([0-9a-zA-Z_]*).json/.");
  }
});

const getStyles = () => ({
  wrapper: css`
    position: relative;
  `,
});

interface Props extends PanelProps<EchartsOptions> {
  theme: DatavTheme;
}

const EchartsPanel: React.FC<Props> = ({ options, data, width, height, theme }) => {
  const styles = getStyles();
  const echartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<echarts.ECharts>();

  const resetOption = debounce(
    () => {
      if (!chart) { return; }
      if (data.state && data.state !== "Done") { return; }
      try {
        chart.clear();
        let getOption = new Function(funcParams, options.optionsFunc);
        const o = getOption(data, theme, chart, echarts);
        o && chart.setOption(o);
      } catch (err) {
        console.error('Editor content error!', err);
      }
    },
    150,
    { leading: true }
  );

  useEffect(() => {
    if (echartRef.current) {
      chart?.clear();
      chart?.dispose();
      setChart(echarts.init(echartRef.current, theme.type));
    }

    return () => {
      chart?.clear();
      chart?.dispose();
    };
  }, [echartRef.current]);

  useEffect(() => {
    chart?.resize();
  }, [width, height]);

  useEffect(() => {
    chart && resetOption();
  }, [chart, options.optionsFunc, data]);

  return (
    <div
      ref={echartRef}
      className={cx(
        styles.wrapper,
        css`
        width: ${width}px;
        height: ${height}px;
      `
      )}
    />
  );
}

export default withTheme(EchartsPanel);
