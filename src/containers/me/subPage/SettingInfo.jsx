import React, {Component} from 'react';
import './style.less';
import chevronRight from '../../../assets/images/chevron-right.svg';
import * as CommonAction from '../../../Utils/common';

export default class SettingInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            telephone: '',
            nickName: '',
            email: ''
        }
    }

    componentDidMount() {
        CommonAction.getItemPlugin('user_info', (userData) => {
            let userInfo = userData;
            if (typeof userInfo === 'string') {
                userInfo = JSON.parse(userInfo);
            }
            console.log(userInfo);
            this.setState({telephone: userInfo.telephone, nickName: userInfo.username, email: userInfo.email});
        }, () => {});
    }

    goToChangePasswordPage(){
        this.props.handleChangePassword();
    }

    render() {
        return (
            <div
                id="setting-info-container"
                className={this.props.show
                ? ''
                : 'hidden-element'}>
                <ul className="m-line">
                    <li className="u-bar">手机
                        <input type="text" value={this.state.telephone} className="set_tel"/></li>
                    <li className="u-bar">昵称
                        <input type="text" value={this.state.nickName} className="set_nick"/></li>
                    <li className="u-bar">Email
                        <input type="text" value={this.state.email} className="set_email"/></li>
                    <li className="u-bar" onClick={this.goToChangePasswordPage.bind(this)}>修改密码<div class="icon_link"><img src={chevronRight}/></div>
                    </li>
                    <li className="u-bar">退出登录</li>
                </ul>
                <div className="info_subm">提交</div>
            </div>
        )
    }
}