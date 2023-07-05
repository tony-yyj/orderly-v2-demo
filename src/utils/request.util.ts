import {environment} from "../enviroments/environment";

export function getNonce(accountId: string) {
    const url = environment.api + '/usercenter/v1/registration_nonce';
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8',
            'accountId': accountId,
        },
    }).then(res => res.json())
}

export function getWithdrawNonce(accountId: string) {
    const url = environment.api + '/balance/user/withdraw_nonce';
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8',
            'x-account-id': accountId,
        },
    }).then(res => res.json())
}

export function withdrawToken(accountId: string, params: any) {
    return fetch(environment.api + '/balance/user/withdraw_request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8',
                'x-account-id': accountId,
            },
            body: JSON.stringify(params),

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

export function setOrderlyKey(params: any) {
    return fetch(environment.api + '/usercenter/v1/orderly_key',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(params),
        }).then(res => res.json())
}
