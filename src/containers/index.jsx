import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './app.less';
export default class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin
            .shouldComponentUpdate
            .bind(this);
        this.state = {
            initDone: false
        }
    }
    render() {
        return (
            <MuiThemeProvider>
                <div class="app-container">
                    {this.state.initDone
                        ? this.props.children
                        : <div>正在加载...</div>
}
                </div>
            </MuiThemeProvider>
        )
    }
    componentDidMount() {
        // 更改状态
        this.setState({initDone: true})
    }
}
