const _host = "http://47.91.79.118:8083",//staging
//const _host = "http://47.91.79.57:8083", //production
//const _host = "http://47.91.79.50:9000",//bad request
    baseServerUrl = _host + "/shoplus-buyer";
const apiConfig = {
    appVersion: "1.0",
    sourceCodeVersion: "201709052105",
    AppName: "Shop",
    isBrowser: !!window
        .navigator
        .userAgent
        .match(/Chrome|Safari/),
    apis: {
        "isUser": baseServerUrl + "/login/query/email",
        "logon": baseServerUrl + "/login/query/user",
        "isRegister": baseServerUrl + "/login/query/email",
        "register": baseServerUrl + "/register/create/user",
        "updateMeInfo": baseServerUrl + "/admin/",
        "userInfo": baseServerUrl + "/admin/account/view",
        "updateUserInfo": baseServerUrl + "/admin/account/update/user",
        "collects": baseServerUrl + "/admin/wish_list/page",
        "addToCart": baseServerUrl + "/admin/cart/add",
        "deleteCollect": baseServerUrl + "/admin/wish_list/remove",
        "addrUpdate": baseServerUrl + "/admin/cart/user_ship_addr/list",
        "addrDelete": baseServerUrl + "/admin/cart/user_ship_addr/delete",
        "addrMyUpdate": baseServerUrl + "/admin/cart/user_ship_addr/update",
        "subNewAddr": baseServerUrl + "/admin/cart/user_ship_addr/create",
        "cartUpdate": baseServerUrl + "/admin/cart/update",
        "addToCollects": baseServerUrl + "/admin/wish_list/create_or_update",
        "initCart": baseServerUrl + "/admin/cart",
        "subCart": baseServerUrl + "/admin/cart/checkout",
        "cartDelete": baseServerUrl + "/admin/cart/delete",
        "subOrder": baseServerUrl + "/admin/cart/submit_order",
        "taxCompute": baseServerUrl + "/admin/cart/getProductTax",
        "getAddrList": baseServerUrl + "/address/list/locationById",
        "addrNext": baseServerUrl + "/cart/fee/getListFeeById",
        "checkSession": baseServerUrl + "/customer/checkSessionUser",
        "myOrderPage": baseServerUrl + "/admin/order",
        "myOrderList": baseServerUrl + "/order/get/orderPage",
        "myOrderListDelete": baseServerUrl + "/admin/order/query/order_page",
        "getBrandList": baseServerUrl + "/brand/get/directory",
        "getProductDetail": baseServerUrl + "/shop/product_detail",
        "shopListByBrand": baseServerUrl + "/brand/get/shopListByBrand",
        "shopListByBrand2": baseServerUrl + "/brand/get/shopListByBrand2",
        "productRootCategory": baseServerUrl + "/product/get/root_category",
        "productCategory": baseServerUrl + "/product/get/categories",
        "shopListByCategory": baseServerUrl + "/brand/get/shopListByCategory",
        "shopListByScreen": baseServerUrl + "/brand/get/shopListByScreen",
        "homeDirectory": baseServerUrl + "/Home/get/homeDirectory",
        "homeDirectoryList": baseServerUrl + "/Home/get/homeDirectoryList",
        "homeDirectoryList2": baseServerUrl + "/Home/get/homeDirectoryList2",
        "newProductList": baseServerUrl + "/Home/get/newProductList",
        "newProductList2": baseServerUrl + "/Home/get/newProductList2",
        "hotBrands": baseServerUrl + "/Home/get/hotBrands",
        "hotShopListByBrand": baseServerUrl + "/brand/get/shopListByBrand",
        "payUrl": baseServerUrl + "/pay/get/requestId",
        "payResultUrl": baseServerUrl + "/pay/get/paymentResult",
        "payResultUrlOffLine": baseServerUrl + "/admin/cart/update_order_without_payment",
        "searchProductList": baseServerUrl + "/Home/get/searchProductList",
        "getProductCount": baseServerUrl + "/admin/cart/getProductCount",
        "shopProductSkuId": baseServerUrl + "/product_sku_detail",
        "searchByLevel2Category": baseServerUrl + "/shop/product/searchByLevel2Category",
        "showOrderAddress": baseServerUrl + "/admin/cart/order_logistics/checkout",
        "subOrderAddress": baseServerUrl + "/admin/cart/update_order_logistics",
        "fee": baseServerUrl + "/shipping/getFee_by_sku"
    },
    errors: {
        "isUser": {
            'handleByPage': '*,-1007,-1009,-5006',
            'errorHandleByPage': '*'
        },
        "logon": {
            'handleByPage': '-1009'
        },
        "isRegister": {
            'handleByPage': '-1007,-5006',
            'errorHandleByPage': '*'
        },
        "register": {
            'handleByPage': '-1002,-1007,-6002,-6023'
        },
        "updateUserInfo": {
            'handleByPage': '*'
        },
        "collects": {},
        "addToCart": {
            'handleByPage': '-1005,-6005,-6022'
        },
        "deleteCollect": {},
        "addrUpdate": {},
        "addrDelete": {
            'handleByPage': '*',
            'errorHandleByPage': '*'
        },
        "addrMyUpdate": {},
        "subNewAddr": {},
        "cartUpdate": {},
        "addToCollects": {
            'handleByPage': '-1006'
        },
        "initCart": {},
        "subCart": {
            'handleByPage': '-6022'
        },
        "cartDelete": {},
        "subOrder": {
            'handleByPage': '*',
            'errorHandleByPage': '*'
        },
        "taxCompute": {},
        "getAddrList": {},
        "addrNext": {},
        "checkSession": {
            'handleByPage': '*', //不作Error处理
        },
        "myOrderPage": {
            'handleByPage': '*', //不作Error处理
        },
        "myOrderList": {},
        "myOrderListDelete": {},
        "getBrandList": {},
        "getProductDetail": {},
        "shopListByBrand": {},
        "productRootCategory": {},
        "productCategory": {},
        "shopListByCategory": {},
        "shopListByScreen": {},
        "homeDirectory": {},
        "homeDirectoryList": {
            'handleByPage': '*', //不作Error处理
        },
        "newProductList": {
            'handleByPage': '*', //不作Error处理
        },
        "hotBrands": {},
        "hotShopListByBrand": {},
        "payUrl": {
            'handleByPage': '*', //不作Error处理
        },
        "payResultUrl": {
            'handleByPage': '*', //不作Error处理
        },
        "payResultUrlOffLine": {
            'handleByPage': '*', //不作Error处理
        },
        "searchProductList": {},
        "getProductCount": {},
        "shopProductSkuId": {}
    },
    //异常提示信息MAP
    error: {
        'emailExist': '邮箱已经被注册',
        'emailNotExist': '邮箱不存在',
        'phoneNotExist': '账号不存在',
        'nickNameNull': '请输入您的昵称',
        'invitationCodeNull': '填写框不能为空',
        'invNumNull': '请输入您的邀请码',
        'invitationCodeError': '邀请码不正确',
        'chechEmailAndPwd': '登陆失败，请检查您的用户名和密码',
        'emailFormatError': '邮箱地址格式错误',
        'registFailed': '注册失败请重新尝试',
        'emailRequired': '请输入邮箱地址',
        'phoneRequired': '请输入手机号',
        'passwordRequired': '请输入密码',
        'confirmPasswordRequired': '请输入确认密码',
        'confirPwdNotAlignPwd': '您两次输入的密码不一致',
        'password6To15': '密码必须是6-15位字符',
        'requestFailed': '请求失败',
        'serverError': '对不起，连接到服务器出错，请稍后再试',
        'telNumFormatError': '请输入正确的手机号码',
        'telNumExist': '您输入的手机号码已注册，请重新输入',
        'changePwdError': '密码更改失败，请检查原有密码是否正确',
        'SKUSTORE_NOT_ENOUGN': "商品库存不足！",
        'addrDeleteSuccess': "删除成功！",
        'addrDeleteFail': "删除失败！",
        'addToCollect': "已收藏 !",
        'postCodeInfo': "请输入正确的邮政编码 !",
        'soldOut': "已售罄商品不能结算 !",
        'addressError1': "请选择收件人对应的省市信息 !",
        'addressError2': "收件人详细地址不能为空 !",
        'addrNameError': "收件人姓名不能为空 !",
        'telNum1FormatError': "请输入正确的发件人电话 !",
        'address1Error': "发件人地址不能为空 !",
        'addrName1Error': "发件人姓名不能为空  !",
        "taxPriceError": "请输入正确的申报价格 !",
        "taxError": "请选择参考税率 !",
        "priceTwoError": "请输入至多两位小数申报价格 !",
        "DeterminedSeparately": "或另行确定",
        "RandomInspection": "及抽检",
        "telNumArea": "请输入收件人手机区号 !",
        "telNumError": "请输入正确的收件人手机号码 !",
        "addressError": "地址信息不能为空 !",
        "areaAdressError": "地区不能为空 !",
        "adressDetailError": "详细地址不能为空 !",
        "provinceError": "请输入省份信息 !",
        "cityError": "请输入市区信息 !",
        "countryError": "请选择国家或地区 !",
        "selectAadrr": "请选择一个有效地址!",
        "cannotDeleteDefaultAddr": "无法删除默认地址！",
        "StockIsNotEnough": "库存不足，请选择其他商品",
        "noStore": "库存不足，请检查并修改所选商品数量 !",
        "maxQuantInfo": "就这么多了, 赶紧抢购吧 !",
        "userItem": "本人承诺所购买商品系个人合理自用，现委托商家代理申报、代缴税款等通关事宜，本人保证遵守《海关法》和国家相关法律法规，保证所提供的身份信息和收货信息真实完整，无侵" +
                "犯他人权益的行为，以上委托关系系如实填写，本人愿意接受海关、检验检疫机构及其他监管部门的监管，并承担相应的法律责任。"
    },
    //wordings
    wordings: {
        'homeNew': '本周新品',
        'recommend': '热门推荐',
        'weixinPay': '微信支付',
        'aliPay': '支付宝支付',
        'cardPay': '银行卡快捷',
        'offLine': '客服支付',
        "addCartStatus_success": "已成功加入购物车", //购物车四种提示信息
        "addCartStatus_haveExist": "购物车已存在",
        "addCartStatus_failed": "加入购物车失败",
        "addCartStatus_logonNeed": "请登录后操作",
        "filter_tips": "亲,不要着急，请选择筛选条件!",
        "collectStatus_success": "成功添加收藏",
        "collectStatus_NeedChoseTip": "亲,请选择一件商品吧!",
        "connection_Error": "休息一下吧，网络开小差了",
        "networkError": "亲，网络不给力哦，请检查您的网络设置",
        "inPay": "付款处理中",
        "inBackPay": "退款处理中",
        "invalidOrder": "订单已失效",
        "subPaySuc": "订单支付成功",
        "subPayFailed": "订单支付失败",
        "subPayError": "订单支付异常"
    },
    orderStatus: [
        {
            status: 0,
            statusType: '全部',
            statusClass: 'all'
        }, {
            status: -1,
            statusType: '待付款',
            statusClass: 'unpayed'
        }, {
            status: 1,
            statusType: '待确认',
            statusClass: 'pending'
        }, {
            status: 2,
            statusType: '待发货',
            statusClass: 'confirmed'
        }, {
            status: 3,
            statusType: '待收货',
            statusClass: 'indelivery'
        }, {
            status: 4,
            statusType: '已收货',
            statusClass: 'received'
        }, {
            status: 6,
            statusType: '商家取消',
            statusClass: 'canceled'
        }
    ],
    imgUrlConfig: '?x-oss-process=image/resize,m_fill,w_imageWith,limit_0/auto-orient,0/format,jpg',
    imgTailorUrlConfig: '?x-oss-process=image/resize,m_fill,w_imageWith,limit_0/auto-orient,0/format,jpg',
    imgPrdListUrlConfig: '?x-oss-process=image/resize,m_lfit,w_imageWith,h_imageHeight,limit_0/auto-orient' +
            ',0/format,jpg',
    imgItemUrlConfig: "?x-oss-process=image/resize,m_lfit,w_imageWith,h_imageHeight,limit_0/auto-orient" +
            ",0/format,jpg",
    imgDetailUrlConfig: '?x-oss-process=image/resize,m_lfit,w_imageWith,limit_0/auto-orient,0/format,jpg',
    imgShareItemUrlConfig: '?x-oss-process=image/resize,m_lfit,w_imageWith,limit_0/auto-orient,0/format,jpg'
}

export {apiConfig};