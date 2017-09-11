import 'whatwg-fetch';

export function get(url){
    return fetch(url);
};

export function post(url, data){
    let formData = new FormData();
    for(let key in data){
        formData.append(key,data[key]);
    }

    return fetch(url, {
        method: 'POST',
        body: formData
    }).then(function(response){
        return response.json()});
};

