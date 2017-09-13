const ConstantVariable = {
    inputType: {
        TELEPHONE: 'telephone',
        EMAIL: 'email',
        PASSWORD: 'password',
        NICKNAME: 'nickname',
        INVITATIONCODE: 'invitationCode',
        COMFIRMPASSWORD: 'comfirmPassword'
    },
    value: {
        BLANK: "",
        ZERO: 0,
        ONE: 1,
        TWO: 2,
        UNDEFINED: undefined,
        TRUE: true,
        FALSE: false
    },
    status: {
        NOT_EXIST: -5006,
        ALREADY_EXIST: 1,
        SUCCESS: 1,
        FORMAT_NOT_CORRECT: -1007,
        //邮箱已存在
        CUSTOMER_USERE_EMAIL_EXIST :-6002,
        //string parameter is empty or null
        PARAM_EMPTY_OR_NULL : -1002,
        //不存在此邀请码
        INVALID_INVITATION_CODE : -6023
    },
    text: {
        TELEPHONE: '手机号*',
        EMAIL: '邮箱*',
        PASSWORD: '密码*',
        NICKNAME: '昵称*',
        INVITATIONCODE: '邀请码*',
        COMFIRMPASSWORD: '确认密码*'
    }
};

export {ConstantVariable};