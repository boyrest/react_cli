import React, {Component} from 'react';
import './style.less';

export default class ChangePassword extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="change-password-container" className={this.props.show?'':'hidden-element'}>
               <ul>
                   <li>原有密码<input type="password" placeholder="请输入原有密码"/></li>
                   <li>新密码<input type="password" placeholder="请输入新密码"/></li>
                   <li>确认密码><input type="password" placeholder="请输入确认密码"/></li>
               </ul>
               <div class="submit-button">提交</div>
            </div>
        )
    }
}