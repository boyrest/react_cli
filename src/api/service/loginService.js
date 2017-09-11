import {apiConfig} from '../apiConfig';
import * as api from '../api'
export function logon(data) {
    return api.post(apiConfig.apis.logon, data);
};

export function validUser(data) {
    return api.post(apiConfig.apis.isUser, data);
};
