import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './style.less';
export default class Filter extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin
            .shouldComponentUpdate
            .bind(this);
       
    }
    render() {
        return (
                <div class="intraMirror-filter-container">
                    filter
                </div>
        )
    }
    componentDidMount() {
        // 更改状态
    
    }
}
