import React, {Component} from 'react';
import './login.less';

import logoImg from '../../assets/images/logo.png';
import TextField from '../../components/LoginTextField';
import logonEmail from '../../assets/images/logon_email.png';
import logonPwd from '../../assets/images/logon_pwd.png';
import helpQR from '../../assets/images/help_logo.png';
import {Utils} from '../../Utils/utils.js';
import * as loginService from '../../api/service/loginService';
import Dialog from 'material-ui/Dialog';
import {ConstantVariable} from '../../constant/ConstantVariable';
import _ from 'lodash';
import $ from 'jquery';
import * as CommonAction from '../../Utils/common';
import {apiConfig} from "../../api/apiConfig";
import PureRenderMixin from 'react-addons-pure-render-mixin'

// import SelectMenu from 'components/SelectMenu';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleTelephoneNumber = this
            .handleTelephoneNumber
            .bind(this);
        this.handlePassword = this
            .handlePassword
            .bind(this);
        this.handleLogin = this
            .handleLogin
            .bind(this);
        this._loginData = {};
        this.postValidInfo = this
            .postValidInfo
            .bind(this);
        this.state = {
            open: false,
            valid: false,
            modalMessage: ''
        };
        this.validInfo = [
            {
                type: ConstantVariable.inputType.TELEPHONE,
                valid: false
            }, {
                type: ConstantVariable.inputType.PASSWORD,
                valid: false
            }
        ];
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    /**
     * @override
     */
    componentDidMount() {}

    /**
     * @override
     */
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    handleTelephoneNumber(telephoneValue) {
        this._loginData.email = encodeURIComponent(Utils.toString(telephoneValue));
    }

    handlePassword(passwordValue) {
        this._loginData.password = passwordValue;
    }

    handleLogin() {
        loginService
            .logon(this._loginData)
            .then((data) => {
                this.logonSuccessCallBack(data);
            })
            .catch((ex, data) => {
                this.logonFailCallBack(data);
            });
    }

    logonSuccessCallBack(data) {
        if (data.status === 1) {
            var jsonDataStr = JSON.stringify($.extend({
                myUsername: this._loginData.email,
                myPassword: this._loginData.password,
                myUserId: data.user.user_id
            }, data.user));
            CommonAction.setItemPlugin("user_info", jsonDataStr, () => {
                CommonAction.setSessionToken(data.token, () => {
                    this.location = "localhost:8080/www/feature/homePage/homePage.html";
                }, () => {});
            }, () => {});
        } else if (data.status === -1009) {
            this
                .refs
                .passwordInput
                .setErrorMessage();
            this.setState({valid: false});
       }
    }

    logonFailCallBack(data) {
        this.setState({open: true, modalMessage: apiConfig.error.requestFailed});

        this.timer = setTimeout(() => {
            this.setState({open: false, modalMessage: ''});
        }, 1000);
    }

    postValidInfo(validInfo) {
        this
            .validInfo
            .forEach(function (item) {
                if (item.type === validInfo.type) {
                    item.valid = validInfo.valid;
                }
            });

        if (2 === _.filter(this.validInfo, function (item) {
            return item.valid
        }).length) {
            this.setState({valid: true});
        } else {
            this.setState({valid: false});
        }
    }

    render() {
        return (
            <div id="logon">
                <header class="register">
                    注册
                </header>
                <div class="img-container"><img class="logo-img" src={logoImg}/></div>
                <div class="login-input">
                    <TextField
                        floatingLabelText="手机号*"
                        type="telephone"
                        headerImg={logonEmail}
                        handleParentChangeEvent={this.handleTelephoneNumber}
                        postValidInfo={this.postValidInfo}/>
                    <TextField
                        floatingLabelText="密码*"
                        type="password"
                        headerImg={logonPwd}
                        handleParentChangeEvent={this.handlePassword}
                        postValidInfo={this.postValidInfo}
                        ref="passwordInput"/>
                    <div class="help-section">
                        <header>需要帮助请扫描下面的二维码联系客服</header>
                        <div class="helpQR-container">
                            <img src={helpQR} alt="customerHelp"/>
                        </div>
                    </div>
                    <button
                        class="login-button"
                        onClick={this.handleLogin}
                        disabled={this.state.valid
                        ? ''
                        : 'disabled'}>
                        登录
                    </button>
                </div>
                <Dialog modal={false} open={this.state.open}>
                    {this.state.modalMessage}
                </Dialog>
            </div>
        )
    }
}