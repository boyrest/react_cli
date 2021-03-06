import {apiConfig} from '../apiConfig';
import * as api from '../api'

export function isRegister(data) {
    return api.post(apiConfig.apis.isRegister, data);
};

export function register(data) {
    return api.post(apiConfig.apis.register, data);
};
