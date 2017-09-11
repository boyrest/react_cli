import fetch from 'isomorphic-fetch';
import config from 'config/pathEv'

export const getProductList = (url, data) => {
    return fetch(url, data)
};

export const getProductPrice = () => {
    return 5;
};
