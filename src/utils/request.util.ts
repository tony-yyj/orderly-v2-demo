import {environment} from "../enviroments/environment";
import * as ed from '@noble/ed25519';
import {decodeBase58, ethers} from "ethers";

export function getNonce(accountId: string) {
    const url = environment.api + '/v1/registration_nonce';
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
    return fetch(environment.api + '/v1/orderly_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(params),
    }).then(res => res.json())
}

export function setOrderlyKey(params: any, accountId: string) {
    return fetch(environment.api + '/v1/orderly_key',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'x-account-id': accountId,
            },
            body: JSON.stringify(params),
        }).then(res => res.json())
}

export const get = (url: string, headers: any, params: any) => {
   return requestMethod(environment.api + url, 'GET', params, headers);
}

const base64url = function (aStr: string): string {
    return aStr.replace(/\+/g, '-').replace(/\//g, '_');
};
export async function handleSignature (url: string, params: any, accountId: string)  {
    const urlParam = url;
    const timestamp = new Date().getTime().toString();
    let message = [timestamp, 'GET', urlParam].join();
    const orderlyPrivateKey = localStorage.getItem('orderly_key_private');

    const u8 = Buffer.from(message);

    const signature = await ed.signAsync(u8, orderlyPrivateKey!);

    const signHex = Buffer.from(signature).toString('base64');

    const b64 = base64url(signHex);
    const pubKey = await ed.getPublicKeyAsync(orderlyPrivateKey!);
    const publicKey = `ed25519:${ethers.encodeBase58(pubKey)}`;


    console.log({
        signature,
        signHex,
        b64,
        publicKey,
    })

    return {
        'orderly-account-id': accountId,
        'orderly-key': publicKey,
        'orderly-timestamp': timestamp,
        'orderly-signature':b64,
    }



}

function requestMethod(url: string, method: string, params: any, headers: any,) {
    return fetch(url, {
        method,
        headers: headers || {},
        body: method === 'POST' ? JSON.stringify(params) : null,

    }).then(res => res.json())

}

const RequestUtil = {
    get,
}

export default RequestUtil

