import {environment} from "../enviroments/environment";

export function getNonce(accountId: string) {
    const url = environment.api + '/usercenter/v1/registration_nonce';
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8',
        },
    }).then(res => res.json())
}

export function registerUser(params: any) {
    return fetch(environment.api + '/usercenter/v1/orderly_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(params),
    }).then(res => res.json())
}

interface ParamsInterface {
    [key: string]: any;
}

type Params = ParamsInterface | null;

const addQuery = (url: string, params?: Params) => {
    // filter empty and null param
    const urlParams: string[] = [];
    if (params) {
        for (const field of Object.keys(params)) {
            if (params[field] === '' || params[field] === null) {
                delete params[field];
            } else {
                urlParams.push(`${field}=${params[field]}`);
            }
        }
    }

    // 添加urlParams
    if (urlParams.length) {
        url = `${url}?${urlParams.join('&')}`;
    }

    return url;
};