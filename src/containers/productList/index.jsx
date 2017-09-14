import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './style.less';
import SearchHeader from '../../components/SearchHeader';
import Filter from '../../components/Filter';
import SwitchCard from '../../components/SwitchCard';
import {Tabs, Tab} from 'material-ui/Tabs';

export default class ProductList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin
            .shouldComponentUpdate
            .bind(this);
        this.state = {
            value: 'a'
        };
        this.styles = {
            headline: {
                fontSize: 24,
                paddingTop: 16,
                marginBottom: 12,
                fontWeight: 400
            }
        };
    }

    handleChange(value){
        this.setState({value: value});
    };

    render() {
        return (
            <div id="main-container">
                <SearchHeader/>
                <Tabs value={this.state.value} onChange={this.handleChange.bind(this)}>
                    <Tab label="上新" value="a">
                        <div>
                            <h2 style={this.styles.headline}>Controllable Tab A</h2>
                            <p>
                                Tabs are also controllable if you want to programmatically pass them their
                                values. This allows for more functionality in Tabs such as not having any Tab
                                selected or assigning them different values.
                            </p>
                        </div>
                    </Tab>
                    <Tab label="热销推荐" value="b">
                        <div>
                            <h2 style={this.styles.headline}>Controllable Tab B</h2>
                            <p>
                                This is another example of a controllable tab. Remember, if you use controllable
                                Tabs, you need to give all of your tabs values or else you wont be able to
                                select them.
                            </p>
                        </div>
                    </Tab>
                </Tabs>
                <Filter/>
                <SwitchCard/>
            </div>
        )
    }
    componentDidMount() {
        // 更改状态

    }
}
