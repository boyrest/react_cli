import React, {Component} from 'react';
import okImg from '../../../assets/images/regSucPic.png';
import './style.less';
import {hashHistory} from 'react-router';

export default class SuccessRegister extends Component{
    constructor(props){
        super(props);
    }

    loginAction(){
        hashHistory.push('/');
    }

    render(){
        
        return (
            <div id="success-register">
                <img src={okImg} className="ok-image"/>
                <span className="success-content">注册成功</span>
                <button className="login-button" onClick={this.loginAction.bind(this)}>登录</button>
            </div>
        )
    }
}