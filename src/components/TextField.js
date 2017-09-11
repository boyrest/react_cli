import React, {Component} from 'react';
import '../styles/TextField.less';
import {ConstantVariable} from "../constant/ConstantVariable";
import {Utils} from '../Utils/utils.js';
import * as loginService from "../api/service/loginService";
import phoneRightImg from '../assets/images/phone-right.png';
import {apiConfig} from "../api/apiConfig";

export default class TextField extends Component {
    constructor(props) {
        super(props);
        this.handleInpuChange = this
            .handleInpuChange
            .bind(this);
        this.handleBlurEvent = this
            .handleBlurEvent
            .bind(this);
        this.handleInputEvent = this
            .handleInputEvent
            .bind(this);
        this.state = {
            hasValue: false,
            value: '',
            showRightImage: false,
            isValid: true,
            errorMessage: '',
            focus:false
        };
        this.isNeedPhoneRightImage = '';
        this.handleFocus = this.handleFocus.bind(this);
        this.time= new Date().getTime().toString();
    }

    /**
     * override
     */
    shouldComponentUpdate(){
        console.log("12345678");
        return true;
    }

    /**
     * 处理组件的值的变化行为
     * @param {*} e 
     */
    handleInpuChange(e) {
        this.setState({
            hasValue: e.target.value
                ? true
                : false,
            value: e.target.value
        })
        this
            .props
            .handleParentChangeEvent(e.target.value);
    }

    /**
     * 处理focus
     */
    handleFocus(){
        this.setState({
            focus: true
        });
    }

    /**
     * 处理组件的blur事件
     */
    handleBlurEvent() {
        this.setState({
            focus: false
        });

        if (ConstantVariable.inputType.TELEPHONE === this.props.type) {
            this._handleTelephoneValidation();
        }
        debugger
        if (ConstantVariable.inputType.PASSWORD === this.props.type) {
            debugger;
            this._handlePasswordValidation(true);
        }
    }

    /**
     * 处理密码输入校验
     */
    handleInputEvent() {
        if (ConstantVariable.inputType.PASSWORD === this.props.type) {
            this._handlePasswordValidation(false);
        }
    }
    /**
     * 处理账户登录的校验
     */
    _handleTelephoneValidation() {
        if (this.state.value !== "") {
            if (Utils.validateTelPhoneNumber(this.state.value)) {
                loginService
                    .validUser({email: this.state.value})
                    .then(function (data) {
                        debugger;
                        switch (data.status) {
                            case 1:
                                this.setState({showRightImage: true, isValid: true});
                                break;
                            case - 5006:
                                this.setState({showRightImage: false, isValid: false, errorMessage: apiConfig.error.phoneNotExist});
                                break;
                            case - 1007:
                                this.setState({showRightImage: false, isValid: false, errorMessage: apiConfig.error.emailFormatError});
                                break;
                            case - 1009:
                                this.setState({showRightImage: false, isValid: false, errorMessage: apiConfig.error.chechEmailAndPwd});
                                break;
                            default:
                                this.setState({showRightImage: false, isValid: false, errorMessage: apiConfig.error.chechEmailAndPwd});
                                //showCommentError(data);
                                break;

                        }
                        //self.checkLogon(self.logonBtnFieldArr, null, 'logonBtn');
                    }.bind(this))
                    .catch(function (ex) {
                        this.setState({showRightImage: false, isValid: false, errorMessage: apiConfig.error.telNumFormatError});
                        //self.checkLogon(self.logonBtnFieldArr, null, 'logonBtn');
                    }.bind(this));
            } else {
                // self.checkLogon(self.logonBtnFieldArr, null, 'logonBtn');
                this.setState({showRightImage: false, isValid: false, errorMessage: apiConfig.error.telNumFormatError});
            }
        } else {
            // self.checkLogon(self.logonBtnFieldArr, null, 'logonBtn');
            this.setState({showRightImage: false, isValid: false, errorMessage: apiConfig.error.phoneRequired});
        }
    }

    /**
     * 处理密码登录校验
     */
    _handlePasswordValidation(isShowMsg) {
        const valText = this.state.value;
        const result = Utils.validateStringLength(valText, 6, 15);

        if (valText == '' || valText == undefined) {
            if (isShowMsg) {
                this.setState({showRightImage: false, isValid: false, errorMessage: apiConfig.error.passwordRequired});
            }
            this.setState({isValid: false});
        } else if (!result) {
            if (isShowMsg) {
                this.setState({showRightImage: false, isValid: false, errorMessage: apiConfig.error.password6To15});
            }
            this.setState({isValid: false});
        } else {
            this.setState({showRightImage: false, isValid: true, errorMessage: ''});
        }
        //self.checkLogon(self.logonBtnFieldArr, null, 'logonBtn');
    }

    render() {
        //如果是输入的类型是登录电话账号,就需要图片
        this.isNeedPhoneRightImage = ConstantVariable.inputType.TELEPHONE === this.props.type
            ? <img
                    src={phoneRightImg}
                    class={this.state.showRightImage
                    ? 'phone-right-image'
                    : 'phone-right-image hide-element'}/>
            : '';
        return (
            <div class="text-field">
                <img src={this.props.headerImg} class="text-field-header"/>
                <label
                    className={this.state.hasValue||this.state.focus
                    ? 'float-text-title'
                    : 'float-text'} for={'inputLable'+this.time}>{this.props.floatingLabelText}</label>
                <input
                    name={'inputLable'+this.time}
                    id={'inputLable'+this.time}
                    type={this.props.type}
                    value={this.state.value}
                    onChange={this.handleInpuChange}
                    onBlur={this.handleBlurEvent}
                    class={this.state.isValid
                    ? ''
                    : 'error-boder'}
                    onInput={this.handleInputEvent} onFocus={this.handleFocus}/> {this.isNeedPhoneRightImage}
                <span
                    class={this.state.isValid
                    ? 'hide-element'
                    : 'error-message'}>{this.state.errorMessage}</span>
            </div>
        )
    }
}
