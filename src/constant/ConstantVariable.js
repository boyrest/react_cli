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
        FORMAT_NOT_CORRECT: -1007
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