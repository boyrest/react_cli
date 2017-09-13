import React, {Component} from 'react';
import './changePassword.less';

export default class ChangePassword extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="change-password-container" className={this.props.show?'':'hidden-element'}>
               changePassword
            </div>
        )
    }
}