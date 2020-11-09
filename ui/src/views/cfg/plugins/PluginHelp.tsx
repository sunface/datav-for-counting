import React, { PureComponent } from 'react';
import { renderMarkdown,getBackendSrv} from 'src/packages/datav-core';

interface Props {
  plugin: {
    name: string;
    id: string;
  };
  type: string;
}

interface State {
  isError: boolean;
  isLoading: boolean;
  help: string;
}

export class PluginHelp extends PureComponent<Props, State> {
  state = {
    isError: false,
    isLoading: false,
    help: '',
  };

  componentDidMount(): void {
    this.loadHelp();
  }

  constructPlaceholderInfo() {
    return 'No plugin help or readme markdown file was found';
  }

  loadHelp = () => {
    const { plugin, type } = this.props;
    this.setState({ isLoading: true });

    getBackendSrv()
      .get(`/api/plugins/markdown`,{
        id: plugin.id
      })
      .then((res: any) => {
        const helpHtml = renderMarkdown(res.data);

        if (res === '' && type === 'help') {
          this.setState({
            isError: false,
            isLoading: false,
            help: this.constructPlaceholderInfo(),
          });
        } else {
          this.setState({
            isError: false,
            isLoading: false,
            help: helpHtml,
          });
        }
      })
      .catch(() => {
        this.setState({
          isError: true,
          isLoading: false,
        });
      });
  };

  render() {
    const { type } = this.props;
    const { isError, isLoading, help } = this.state;

    if (isLoading) {
      return <h2>Loading help...</h2>;
    }

    if (isError) {
      return <h3>'Error occurred when loading help'</h3>;
    }

    if (type === 'panel_help' && help === '') {
    }

    return <div className="markdown-html" dangerouslySetInnerHTML={{ __html: help }} />;
  }
}
