import React, {Component} from 'react';
import '../styles/login.less';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logoImg from '../assets/images/logo.png';
import TextField from 'components/TextField';
import logonEmail from '../assets/images/logon_email.png';
import logonPwd from '../assets/images/logon_pwd.png';
import helpQR from '../assets/images/help_logo.png';
import {Utils} from '../Utils/utils.js';
import * as loginService from '../api/service/loginService';

// import SelectMenu from 'components/SelectMenu';

export default class LoginPage extends Component {
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
            .then(function (text) {
                console.log('got text', text)
            })
            .catch(function (ex) {
                console.log('failed', ex)
            });
    }

    render() {
        return (
            <MuiThemeProvider>
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
                            handleParentChangeEvent={this.handleTelephoneNumber}/>
                        <TextField
                            floatingLabelText="密码*"
                            type="password"
                            headerImg={logonPwd}
                            handleParentChangeEvent={this.handlePassword}/>
                        <div class="help-section">
                            <header>需要帮助请扫描下面的二维码联系客服</header>
                            <div class="helpQR-container">
                                <img src={helpQR} alt="customerHelp"/>
                            </div>
                        </div>
                        <div class="login-button" onClick={this.handleLogin}>
                            登录
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}
