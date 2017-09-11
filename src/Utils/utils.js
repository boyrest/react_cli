const Utils = {
    /**
     *
     * @param {*} inputData
     * 转换所有输入为String
     */
    toString: function (inputData) {
        return String(inputData);
    },
    /**
     * 判断是否数字
     *
     * @param str
     * @returns
     */
    validateNumber: function (str) {
        return /^[0-9]*$/.test(str);
    },
    /**
    *手机号校验是否合法,注册和登录的时候用
    *1：纯数字
    *2：最后只有一个+号，且以+号开头
    */
    validateTelPhoneNumber: function (telNumb) {
        let result = false;
        if (telNumb && telNumb != '') {
            let arr = telNumb.split("+");
            if (arr.length == 1) { //没有加号
                if (Utils.validateNumber(arr)) {
                    result = true;
                }
            } else if (arr.length == 2) { //只有一个加号
                if (arr[0] == "" && Utils.validateNumber(arr[1]) && arr[1].length >= 1) { //至少有一个数字
                    result = true;
                }
            }
        }
        return result;
    },
    /**
     * 检查字符串长度
     * @param string 字符串，min 最小值，max 最大值
     * @returns {boolean} 是否在[min, max]之间
     */
    validateStringLength: function (string, min, max) {
        let length = Utils.countStringLength(string);
        return (length < min || length > max)
            ? false
            : true;
    },

    /**
     * 计算字符串长度，兼容中文
     * @param string 字符串
     * @returns {*} 长度
     */

    countStringLength: function (string) {
        let chineseCharacters = string.match(/[^ -~]/g);
        return string.length + (chineseCharacters
            ? chineseCharacters.length
            : 0);
    }

}

export {Utils};