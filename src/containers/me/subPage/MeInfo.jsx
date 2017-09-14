import React, {Component} from 'react';
import './style.less';
import chevronRight from '../../../assets/images/chevron-right.svg';
import iconWallet from '../../../assets/images/icon_Wallet.png';
import iconScan from '../../../assets/images/icon_scan.png';
import iconBox from '../../../assets/images/icon_Box.png';
import iconTruck from '../../../assets/images/icon_Truck.png';
import iconChat from '../../../assets/images/icon_Chat.png';
import iconMoney from '../../../assets/images/icon_Money.png';


export default class MeInfo extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="me-info-container" className={this.props.show?'':'hidden-element'}>
               <div className="m-myoder">
                    <div className="lt">我的订单</div>
                    <div className="icon_link order_list">查看全部订单 <img src={chevronRight}/></div>
                    <ul className="order_state">
                        <li id="unpayed" class="box1"><img src={iconWallet}/><p>待付款</p></li>
                        <li id="pending" class="box2"><img src={iconScan}/><p>待确认</p></li>
                        <li id="confirmed" class="box3"><img src={iconBox}/><p>待发货</p></li>
                        <li id="indelivery" class="box4"><img src={iconTruck}/><p>待收货</p></li>
                        <li id="received" class="box5"><img src={iconChat}/><p>已收货</p></li>
                        <li id="canceled" class="box6"><img src={iconMoney}/><p>商家取消</p></li>
                    </ul>
                </div>
                <ul className="m-link">
                    <li className="u-bar">地址簿<div class="icon_link"><img src={chevronRight}/></div></li>
                    <li className="u-bar">帮助<div class="icon_link"><img src={chevronRight}/></div></li>
                    <li className="u-bar">联系我们<div class="icon_link"><img src={chevronRight}/></div></li>
                    <li className="u-bar">应用版本号<div class="bar_version" id="appVersion"></div></li>
                    <li className="u-bar">资源版本号<div class="bar_version" id="sourceCodeVersion"></div></li>
                </ul>
            </div>
        )
    }
}