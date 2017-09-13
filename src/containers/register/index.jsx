import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import './register.less';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TextField from 'material-ui/TextField';
import logoImg from '../../assets/images/logo.png';
import backArrowImg from '../../assets/images/backToLog.png';
import {ConstantVariable} from '../../constant/ConstantVariable';
import {Utils} from '../../Utils/utils';
import * as registerService from "../../api/service/registerService";
import {apiConfig} from "../../api/apiConfig";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.textFieldModalList = [
            {
                type: ConstantVariable.inputType.TELEPHONE,
                floatingLabelText: ConstantVariable.text.TELEPHONE,
                errorMessage: ConstantVariable.value.BLANK,
                valid: ConstantVariable.value.TRUE,
                value: ConstantVariable.value.BLANK,
                valueBlurFuction: this._validateTelephoneNumber,
                valueChangeFunction: this._valueChange

            }, {
                type: ConstantVariable.inputType.EMAIL,
                floatingLabelText: ConstantVariable.text.EMAIL,
                errorMessage: ConstantVariable.value.BLANK,
                valid: ConstantVariable.value.TRUE,
                value: ConstantVariable.value.BLANK,
                valueBlurFuction: this.fieldValueChange,
                valueChangeFunction: this._valueChange

            }, {
                type: ConstantVariable.inputType.NICKNAME,
                floatingLabelText: ConstantVariable.text.NICKNAME,
                errorMessage: ConstantVariable.value.BLANK,
                valid: ConstantVariable.value.TRUE,
                value: ConstantVariable.value.BLANK,
                valueBlurFuction: this.fieldValueChange,
                valueChangeFunction: this._valueChange

            }, {
                type: ConstantVariable.inputType.INVITATIONCODE,
                floatingLabelText: ConstantVariable.text.INVITATIONCODE,
                errorMessage: ConstantVariable.value.BLANK,
                valid: ConstantVariable.value.TRUE,
                value: ConstantVariable.value.BLANK,
                valueBlurFuction: this.fieldValueChange,
                valueChangeFunction: this._valueChange

            }, {
                type: ConstantVariable.inputType.PASSWORD,
                floatingLabelText: ConstantVariable.text.PASSWORD,
                errorMessage: ConstantVariable.value.BLANK,
                valid: ConstantVariable.value.TRUE,
                value: ConstantVariable.value.BLANK,
                valueBlurFuction: this.fieldValueChange,
                valueChangeFunction: this._valueChange

            }, {
                type: ConstantVariable.inputType.COMFIRMPASSWORD,
                floatingLabelText: ConstantVariable.text.COMFIRMPASSWORD,
                errorMessage: ConstantVariable.value.BLANK,
                valid: ConstantVariable.value.TRUE,
                value: ConstantVariable.value.BLANK,
                valueBlurFuction: this.fieldValueChange,
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

    fieldValueChange() {}
    _valueChange(index, event, newValue) {
        this.textFieldModalList[index].value = newValue;
        this.setState({fields: this.textFieldModalList.slice(0)});
    }

    _updateRegisterButton() {
        const inValidFields = _.filter(this.state.fields, (item) => {
            return item.value === ConstantVariable.value.BLANK || item.valid === ConstantVariable.value.FALSE || item.errorMessage !== ConstantVariable.value.BLANK;
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
                this.textFieldModalList[index].valid = ConstantVariable.value.TRUE;
                registerService
                    .isRegister({email: encodeURIComponent(telNum)})
                    .then((data) => {
                        debugger;
                        switch (data.status) {
                            case ConstantVariable.status.NOT_EXIST:
                                this.textFieldModalList[index].errorMessage = ConstantVariable.value.BLANK;
                                this.textFieldModalList[index].valid = ConstantVariable.value.TRUE;
                                break;
                            case ConstantVariable.status.ALREADY_EXIST:
                                this.textFieldModalList[index].errorMessage = apiConfig.error.telNumExist;
                                this.textFieldModalList[index].valid = ConstantVariable.value.FALSE;
                                break;
                            case ConstantVariable.status.FORMAT_NOT_CORRECT:
                                this.textFieldModalList[index].errorMessage = apiConfig.error.telNumFormatError;
                                this.textFieldModalList[index].valid = ConstantVariable.value.FALSE;
                                break;
                            default:
                                this.textFieldModalList[index].valid = ConstantVariable.value.FALSE;
                                //showCommentError(data);
                                break;
                        }
                        this.setState({fields: this.textFieldModalList.slice(0)});
                        this._updateRegisterButton();
                    })
                    .catch((ex) => {
                        this.textFieldModalList[index].valid = ConstantVariable.value.FALSE;
                        this.textFieldModalList[index].errorMessage = apiConfig.error.registFailed;
                        this.setState({fields: this.textFieldModalList.slice(0)});
                        this._updateRegisterButton();
                    });

            } else {
                this.textFieldModalList[index].valid = ConstantVariable.value.FALSE;
                this.textFieldModalList[index].errorMessage = apiConfig.error.telNumFormatError;
            }
        } else {
            this.textFieldModalList[index].valid = ConstantVariable.value.FALSE;
            this.textFieldModalList[index].errorMessage = apiConfig.error.phoneRequired;
        }
        this.setState({fields: this.textFieldModalList.slice(0)});
        this._updateRegisterButton();
    }
    
    _validateEmail() {}

    _validateNickname() {}

    _validatePassword() {}

    _confirmPassword() {}

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
                <button className="submit-button">
                    提交
                </button>
            </div>
        )
    }
}