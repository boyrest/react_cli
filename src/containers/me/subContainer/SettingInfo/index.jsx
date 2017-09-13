import React, {Component} from 'react';
import './settingInfo.less';

export default class SettingInfo extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="setting-info-container" className={this.props.show?'':'hidden-element'}>
               setting
            </div>
        )
    }
}