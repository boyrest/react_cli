import {apiConfig} from '../api/apiConfig';

function setItemPlugin(name, value, setItemSuccess, setItemError) {
    if (apiConfig.isBrowser) {
        console.groupCollapsed('setter itme key == ' + name);
        console.groupEnd();
        localStorage.setItem(name, value, setItemSuccess, setItemError);
        if (setItemSuccess) {
            setItemSuccess();
        }
    } else {
        //CordovaLocalStorage.setItem(name, value, setItemSuccess, setItemError);
    }
}

function getItemPlugin(name, getItemSuccess, getItemError) {
    if (apiConfig.isBrowser) {
        getItemSuccess(localStorage.getItem(name));
    } else {
        //CordovaLocalStorage.getItem(name, getItemSuccess, getItemError);
    }
}

/**set session token**/
function setSessionToken(value, successCallback, failCallBack) {
    var key = apiConfig.token || "token";
    var result = (function() {
        var result = false;
        setItemPlugin(key, value, successCallback, failCallBack);
        return result;
    })();
}

export {setItemPlugin,setSessionToken,getItemPlugin};