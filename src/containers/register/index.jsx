import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import './register.less';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TextField from 'material-ui/TextField';
import logoImg from '../../assets/images/logo.png';
import backArrowImg from '../../assets/images/backToLog.png';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin
            .shouldComponentUpdate
            .bind(this);
        this.backTologinPage = this
            .backTologinPage
            .bind(this);
        this.state = {
            fields: [
                {
                    type: 'telphone',
                    floatingLabelText: '手机号*',
                    errorMessage: '',
                    valid: false,
                    valueChangeFuction: this
                        .fieldValueChange
                        .bind(this)
                }, {
                    type: 'email',
                    floatingLabelText: '邮箱*',
                    errorMessage: '',
                    valid: false,
                    valueChangeFuction: this
                        .fieldValueChange
                        .bind(this)
                }, {
                    type: 'nickname',
                    floatingLabelText: '昵称*',
                    errorMessage: '',
                    valid: false,
                    valueChangeFuction: this
                        .fieldValueChange
                        .bind(this)
                }, {
                    type: 'invitationCode',
                    floatingLabelText: '邀请码*',
                    errorMessage: '',
                    valid: false,
                    valueChangeFuction: this
                        .fieldValueChange
                        .bind(this)
                }, {
                    type: 'password',
                    floatingLabelText: '密码*',
                    errorMessage: '',
                    valid: false,
                    valueChangeFuction: this
                        .fieldValueChange
                        .bind(this)
                }, {
                    type: 'comfirmPassword',
                    floatingLabelText: '确认密码*',
                    errorMessage: '',
                    valid: false,
                    valueChangeFuction: this
                        .fieldValueChange
                        .bind(this)
                }
            ]
        }
        console.log(this.state.fields);
    }

    fieldValueChange() {}

    backTologinPage() {
        hashHistory.push('/');
    }

    render() {
        return (
            <div id="register">
                <div class="black-bg"></div>
                <div class="fields-container">
                    <img class="logo-img" src={logoImg}/>
                    <img class="back-arrow" src={backArrowImg} onClick={this.backTologinPage}/>
                    <div class="fields">
                        {this.state.fields.map((field, index) => {
                                return <TextField
                                    floatingLabelText={field.floatingLabelText}
                                    className="text-field"
                                    fullWidth={true}
                                    key={index}
                                    underlineFocusStyle={{}}/>
                                })
                        }
                    </div>
                    <button class="submit-button">
                        提交
                    </button>
                </div>
            </div>
        )
    }
}