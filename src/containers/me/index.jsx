import React, {Component} from 'react';
import './style.less';
import MeInfo from './subPage/MeInfo.jsx';
import SettingInfo from './subPage/SettingInfo.jsx';
import ChangePassword from './subPage/ChangePassword.jsx';
import returnArrow from '../../assets/images/icon_returnArrow.png';
import setIcon from '../../assets/images/icon_set.png';
import * as CommonAction from '../../Utils/common';
import cam1 from '../../assets/images/Camera-1.png';
import cam2 from '../../assets/images/Camera-2.png';

export default class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSubPage: 'MeInfo',
            imaCam1: cam1,
            imaCam2: cam2,
            userName: ''
        }
    }

    componentWillMount() {
        CommonAction.getItemPlugin('user_info', (userData) => {
            let userInfo = userData;
            if (typeof userInfo === 'string') {
                userInfo = JSON.parse(userInfo);
            }
            console.log(userInfo);
            this.setState({
                userName: userInfo.myUsername,
                imaCam1: userInfo.user_image
                    ? userInfo.user_image
                    : this.state.imaCam1,
                imaCam2: userInfo.user_image
                    ? ''
                    : this.state.imaCam2
            });
        }, () => {});
    }

    handleBack() {
        if (this.state.currentSubPage === 'SettingInfo') {
            this.setState({currentSubPage: 'MeInfo'})
        }

        if (this.state.currentSubPage === 'ChangePassword') {
            this.setState({currentSubPage: 'SettingInfo'})
        }

    }

    goToSettingInfo() {
        this.setState({currentSubPage: 'SettingInfo'})
    }

    goToChangePassword() {
        this.setState({currentSubPage: 'ChangePassword'})
    }

    render() {
        return (
            <div id="me-container">
                <img
                    src={returnArrow}
                    className="back-icon"
                    onClick={this
                    .handleBack
                    .bind(this)}/>
                <img
                    src={setIcon}
                    className={this.state.currentSubPage === 'MeInfo'?'setting-icon':'hidden-element'}
                    onClick={this
                    .goToSettingInfo
                    .bind(this)}/>

                <div className="header-container">
                    <img className="cam1" src={this.state.imaCam1}/>
                    <img className="cam2" src={this.state.imaCam2}/>
                    <span className="userName">{this.state.userName}</span>
                </div>
                <MeInfo
                    show={this.state.currentSubPage === 'MeInfo'
                    ? true
                    : false}/>
                <SettingInfo
                    show={this.state.currentSubPage === 'SettingInfo'
                    ? true
                    : false}
                    handleChangePassword={this
                    .goToChangePassword
                    .bind(this)}/>
                <ChangePassword
                    show={this.state.currentSubPage === 'ChangePassword'
                    ? true
                    : false}/>
            </div>
        )
    }
}