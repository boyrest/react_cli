import React, {Component} from 'react';
import '../styles/login.less';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logoImg from '../assets/images/logo.png';
import TextField from 'components/TextField';
import logonEmail from  '../assets/images/logon_email.png';
import logonPwd from  '../assets/images/logon_pwd.png';
import helpQR from  '../assets/images/help_logo.png';
// import SelectMenu from 'components/SelectMenu';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
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
                            type="telephone" headerImg={logonEmail}/>
                        <TextField
                            hintText=""
                            floatingLabelText="密码*"
                            type="password" headerImg={logonPwd}/>
                        <div class="help-section">
                            <header>需要帮助请扫描下面的二维码联系客服</header>
                            <div class="helpQR-container">
                                <img src={helpQR} alt="customerHelp"/>
                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}
