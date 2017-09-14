import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import './style.less';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TextField from 'material-ui/TextField';
import logoImg from '../../../assets/images/logo.png';
import backArrowImg from '../../../assets/images/backToLog.png';
import {ConstantVariable} from '../../../constant/ConstantVariable';
import {Utils} from '../../../Utils/utils';
import * as registerService from "../../../api/service/registerService";
import {apiConfig} from "../../../api/apiConfig";
import _ from 'lodash';
import $ from 'jquery';
import * as CommonAction from '../../../Utils/common';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.textFieldModalList = [
            {
                type: ConstantVariable.inputType.TELEPHONE,
                floatingLabelText: ConstantVariable.text.TELEPHONE,
                errorMessage: ConstantVariable.value.BLANK,
                value: ConstantVariable.value.BLANK,
                valueBlurFuction: this._validateTelephoneNumber,
                valueChangeFunction: this._valueChange

            }, {
                type: ConstantVariable.inputType.EMAIL,
                floatingLabelText: ConstantVariable.text.EMAIL,
                errorMessage: ConstantVariable.value.BLANK,
                value: ConstantVariable.value.BLANK,
                valueBlurFuction: this._validateEmail,
                valueChangeFunction: this._valueChange

            }, {
                type: ConstantVariable.inputType.NICKNAME,
                floatingLabelText: ConstantVariable.text.NICKNAME,
                errorMessage: ConstantVariable.value.BLANK,
                value: ConstantVariable.value.BLANK,
                valueBlurFuction: this._validateNickname,
                valueChangeFunction: this._valueChange

            }, {
                type: ConstantVariable.inputType.INVITATIONCODE,
                floatingLabelText: ConstantVariable.text.INVITATIONCODE,
                errorMessage: ConstantVariable.value.BLANK,
                value: ConstantVariable.value.BLANK,
                valueBlurFuction: this._validateInvitationCode,
                valueChangeFunction: this._valueChange

            }, {
                type: ConstantVariable.inputType.PASSWORD,
                floatingLabelText: ConstantVariable.text.PASSWORD,
                errorMessage: ConstantVariable.value.BLANK,
                value: ConstantVariable.value.BLANK,
                valueBlurFuction: this._validatePassword,
                valueChangeFunction: this._valueChange

            }, {
                type: ConstantVariable.inputType.COMFIRMPASSWORD,
                floatingLabelText: ConstantVariable.text.COMFIRMPASSWORD,
                errorMessage: ConstantVariable.value.BLANK,
                value: ConstantVariable.value.BLANK,
                valueBlurFuction: this._validataConfirmPassword,
                valueChangeFunction: this._valueChange

            }
        ]
        this.shouldComponentUpdate = PureRenderMixin
            .shouldComponentUpdate
            .bind(this);
        this.backTologinPage = this
            .backTologinPage
            .bind(this);
        this.state = {
            fields: this.textFieldModalList,
            registerButtonDisabled: true
        }
    }

    _valueChange(index, event, newValue) {
        this.textFieldModalList[index].value = newValue;
        this.setState({
            fields: this
                .textFieldModalList
                .slice(0)
        });
    }

    _updateRegisterButton() {
        const inValidFields = _.filter(this.state.fields, (item) => {
            return item.value === ConstantVariable.value.BLANK || item.errorMessage !== ConstantVariable.value.BLANK;
        });
        this.setState({
            registerButtonDisabled: inValidFields.length > ConstantVariable.value.ZERO
                ? ConstantVariable.value.TRUE
                : ConstantVariable.value.FALSE
        });
    }

    _validateTelephoneNumber(index) {
        const telephoneValue = _.find(this.state.fields, (item) => {
            return item.type === ConstantVariable.inputType.TELEPHONE;
        });

        if (ConstantVariable.value.BLANK !== telephoneValue.value) {
            const telNum = telephoneValue.value;
            if (Utils.validateTelPhoneNumber(telNum)) {
                this.textFieldModalList[index].errorMessage = ConstantVariable.value.BLANK;
                registerService
                    .isRegister({email: encodeURIComponent(telNum)})
                    .then((data) => {
                        switch (data.status) {
                            case ConstantVariable.status.NOT_EXIST:
                                this.textFieldModalList[index].errorMessage = ConstantVariable.value.BLANK;
                                break;
                            case ConstantVariable.status.ALREADY_EXIST:
                                this.textFieldModalList[index].errorMessage = apiConfig.error.telNumExist;
                                break;
                            case ConstantVariable.status.FORMAT_NOT_CORRECT:
                                this.textFieldModalList[index].errorMessage = apiConfig.error.telNumFormatError;
                                break;
                            default:
                                this.textFieldModalList[index].errorMessage = "need deal";
                                //showCommentError(data);
                                break;
                        }
                        this.setState({
                            fields: this
                                .textFieldModalList
                                .slice(0)
                        });
                        this._updateRegisterButton();
                    })
                    .catch((ex) => {
                        this.textFieldModalList[index].errorMessage = apiConfig.error.registFailed;
                        this.setState({
                            fields: this
                                .textFieldModalList
                                .slice(0)
                        });
                        this._updateRegisterButton();
                    });

            } else {
                this.textFieldModalList[index].errorMessage = apiConfig.error.telNumFormatError;
            }
        } else {
            this.textFieldModalList[index].errorMessage = apiConfig.error.phoneRequired;
        }
        this.setState({
            fields: this
                .textFieldModalList
                .slice(0)
        });
        this._updateRegisterButton();
    }

    _validateEmail(index) {
        const emailValue = _.find(this.state.fields, (item) => {
            return item.type === ConstantVariable.inputType.EMAIL;
        });

        if (emailValue.value !== ConstantVariable.value.BLANK) {
            const email = emailValue.value;
            if (Utils.validateEmail(email)) {
                this.textFieldModalList[index].errorMessage = ConstantVariable.value.BLANK;
                registerService
                    .isRegister({email: email})
                    .then((data) => {
                        switch (data.status) {
                            case ConstantVariable.status.NOT_EXIST:
                                this.textFieldModalList[index].errorMessage = ConstantVariable.value.BLANK;
                                break;
                            case ConstantVariable.status.ALREADY_EXIST:
                                this.textFieldModalList[index].errorMessage = apiConfig.error.emailExist;
                                break;
                            case ConstantVariable.status.FORMAT_NOT_CORRECT:
                                this.textFieldModalList[index].errorMessage = apiConfig.error.emailFormatError;
                                break;
                            default:
                                this.textFieldModalList[index].errorMessage = "need deal";
                                break;
                        }
                        this.setState({
                            fields: this
                                .textFieldModalList
                                .slice(0)
                        });
                        this._updateRegisterButton();
                    })
                    .catch((ex) => {
                        this.textFieldModalList[index].errorMessage = apiConfig.error.registFailed;
                        this.setState({
                            fields: this
                                .textFieldModalList
                                .slice(0)
                        });
                        this._updateRegisterButton();
                    });

            } else {
                this.textFieldModalList[index].errorMessage = apiConfig.error.emailFormatError;
            }
        } else {
            this.textFieldModalList[index].errorMessage = apiConfig.error.emailRequired;
        }
        this.setState({
            fields: this
                .textFieldModalList
                .slice(0)
        });
        this._updateRegisterButton();
    }

    _validateNickname(index) {
        const niceValue = _.find(this.state.fields, (item) => {
            return item.type === ConstantVariable.inputType.NICKNAME;
        });

        const nickname = niceValue.value;
        if (nickname === ConstantVariable.value.BLANK) {
            this.textFieldModalList[index].errorMessage = apiConfig.error.nickNameNull;
        } else {
            this.textFieldModalList[index].errorMessage = ConstantVariable.value.BLANK;
        }
        this.setState({
            fields: this
                .textFieldModalList
                .slice(0)
        });
        this._updateRegisterButton();
    }

    _validateInvitationCode(index) {
        const invNumValue = _.find(this.state.fields, (item) => {
            return item.type === ConstantVariable.inputType.INVITATIONCODE;
        });

        const invNum = invNumValue.value;
        if (invNum === ConstantVariable.value.BLANK) {
            this.textFieldModalList[index].errorMessage = apiConfig.error.invNumNull;
        } else {
            this.textFieldModalList[index].errorMessage = ConstantVariable.value.BLANK;
        }

        this.setState({
            fields: this
                .textFieldModalList
                .slice(0)
        });
        this._updateRegisterButton();
    }

    _validatePassword(index) {
        const passwordValue = _.find(this.state.fields, (item) => {
            return item.type === ConstantVariable.inputType.PASSWORD;
        });
        const valText = passwordValue.value;
        const result = Utils.validateStringLength(valText, 6, 15);
        if (valText === ConstantVariable.value.BLANK || valText === ConstantVariable.value.UNDEFINED) {
            this.textFieldModalList[index].errorMessage = apiConfig.error.passwordRequired;
        } else if (!result) {
            this.textFieldModalList[index].errorMessage = apiConfig.error.password6To15;
        } else {
            const confirmValue = _.find(this.state.fields, (item) => {
                return item.type === ConstantVariable.inputType.COMFIRMPASSWORD;
            });

            if (confirmValue.value !== ConstantVariable.value.BLANK && confirmValue.errorMessage === ConstantVariable.value.BLANK) {
                if (valText !== confirmValue.value) {
                    this.textFieldModalList[index].errorMessage = apiConfig.error.confirPwdNotAlignPwd;
                } else {
                    this.textFieldModalList[index].errorMessage = ConstantVariable.value.BLANK;
                }
            } else {
                this.textFieldModalList[index].errorMessage = ConstantVariable.value.BLANK;
            }
        }

        this.setState({
            fields: this
                .textFieldModalList
                .slice(0)
        });
        this._updateRegisterButton();
    }

    _validataConfirmPassword(index) {
        const confirmPasswordValue = _.find(this.state.fields, (item) => {
            return item.type === ConstantVariable.inputType.COMFIRMPASSWORD;
        });
        const valText = confirmPasswordValue.value;
        const result = Utils.validateStringLength(valText, 6, 15);
        if (valText === ConstantVariable.value.BLANK || valText === ConstantVariable.value.UNDEFINED) {
            this.textFieldModalList[index].errorMessage = apiConfig.error.passwordRequired;
        } else if (!result) {
            this.textFieldModalList[index].errorMessage = apiConfig.error.password6To15;
        } else {
            const passwordValue = _.find(this.state.fields, (item) => {
                return item.type === ConstantVariable.inputType.PASSWORD;
            });
            
            if (passwordValue.value !== ConstantVariable.value.BLANK && passwordValue.errorMessage === ConstantVariable.value.BLANK) {
                if (valText !== passwordValue.value) {
                    this.textFieldModalList[index].errorMessage = apiConfig.error.confirPwdNotAlignPwd;
                } else {
                    this.textFieldModalList[index].errorMessage = ConstantVariable.value.BLANK;
                }
            } else {
                this.textFieldModalList[index].errorMessage = ConstantVariable.value.BLANK;
            }
        }

        this.setState({
            fields: this
                .textFieldModalList
                .slice(0)
        });
        this._updateRegisterButton();
    }

    registeAccount() {
        debugger;
        if(this.state.registerButtonDisabled === true)
            return;
        const dataPost = {}
        this
            .textFieldModalList
            .forEach((item) => {
                switch (item.type) {
                    case ConstantVariable.inputType.TELEPHONE:
                    dataPost.mobile = item.value;
                        break;
                    case ConstantVariable.inputType.EMAIL:
                    dataPost.email = item.value;
                        break;
                    case ConstantVariable.inputType.INVITATIONCODE:
                    dataPost.invitationCode = item.value;
                        break;
                    case ConstantVariable.inputType.NICKNAME:
                    dataPost.nikeName = item.value;
                        break;
                    case ConstantVariable.inputType.PASSWORD:
                    dataPost.password = item.value;
                        break;
                    default:
                        break;
                }
            });
        registerService
            .register(dataPost)
            .then((data) => {
                switch (data.status) {
                    case ConstantVariable.status.SUCCESS:
                        const jsonDataStr = JSON.stringify($.extend({
                            myUsername: dataPost.mobile,
                            myPassword: dataPost.password,
                            myUserId: data.user.user_id
                        }, data.user));
                      
                        CommonAction.setItemPlugin("user_info", jsonDataStr, function () {
                            debugger;
                            hashHistory.push('/successRegister');
                        }, function () {});
                        break;
                    case ConstantVariable.status.CUSTOMER_USERE_EMAIL_EXIST:
                        //showLJQMLoadingMsg($self.errorMessages.emailExist, true, 'b', true, false, 1000);
                        break;
                    case ConstantVariable.status.PARAM_EMPTY_OR_NULL:
                        //showLJQMLoadingMsg($self.errorMessages.invitationCodeNull, true, 'b', true, false, 1000);
                        break;
                    case ConstantVariable.status.INVALID_INVITATION_CODE:
                        //showLJQMLoadingMsg($self.errorMessages.invitationCodeError, true, 'b', true, false, 1000);
                        break;
                    case ConstantVariable.status.FORMAT_NOT_CORRECT:
                        //showLJQMLoadingMsg($self.errorMessages.emailFormatError, true, 'b', true, false, 1000);
                        break;
                    default:
                        break;
                }
            })
            .catch((ex) => {
                //showLJQMLoadingMsg($self.errorMessages.requestFailed, true, 'b', true, false, 1000);
            });

    }

    backTologinPage() {
        hashHistory.push('/');
    }

    render() {
        return (
            <div id="register">
                <div className="black-bg"></div>
                <div className="fields-container">
                    <img className="logo-img" src={logoImg}/>
                    <img className="back-arrow" src={backArrowImg} onClick={this.backTologinPage}/>
                    <div className="fields">
                        {this
                            .state
                            .fields
                            .map((field, index) => {
                                return <TextField
                                    floatingLabelText={field.floatingLabelText}
                                    className="text-field"
                                    fullWidth={true}
                                    key={index}
                                    errorText={field.errorMessage}
                                    errorStyle={{
                                    paddingLeft: '20px',
                                    color: '#DB1616',
                                    fontSize: '12px',
                                    fontFamily: 'Hiragino',
                                    position: 'absolute',
                                    bottom: '-10px'
                                }}
                                    underlineFocusStyle={{
                                    transform: 'none',
                                    borderColor: 'white',
                                    borderBottom: '1.25px solid white'
                                }}
                                    type
                                    ={field.type === ConstantVariable.inputType.COMFIRMPASSWORD || field.type === ConstantVariable.inputType.PASSWORD||field.type === ConstantVariable.inputType.INVITATIONCODE
                                    ? 'password'
                                    : 'text'}
                                    onBlur={field
                                    .valueBlurFuction
                                    .bind(this, index)}
                                    onChange={field
                                    .valueChangeFunction
                                    .bind(this, index)}/>
                            })
}
                    </div>
                </div>
                <button
                    className="submit-button"
                    onClick={this
                    .registeAccount
                    .bind(this)}>
                    提交
                </button>
            </div>
        )
    }
}