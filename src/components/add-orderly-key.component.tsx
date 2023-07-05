import {KeyScopeEnum} from "../utils/key";
import {ChangeEvent, useState} from "react";
import {getAddOrderlyKeyMsg, signEIP721} from "../utils/eip721";
import {useWalletConnect} from "../WalletConnectContext";
import * as ed from '@noble/ed25519';
import {ethers} from "ethers";
import {setOrderlyKey} from "../utils/request.util";

export function AddOrderlyKeyComponent() {
    const {wallet} = useWalletConnect();
    const chainId = parseInt(wallet.chainId);
    const userAddress = wallet.accounts[0];
    const [expireTime, setExpireTime] = useState<number>(0);
    const [scope, setScope] = useState<string[]>([KeyScopeEnum.READ])

    const onChangeExpireTime = (e: ChangeEvent) => {
        const target = (e.target as HTMLInputElement);
        setExpireTime(parseInt(target.value));

    }
    const onChangeScope = (e: ChangeEvent) => {
        const target = (e.target as HTMLSelectElement);
        const value = Array.from(target.selectedOptions, option => option.value);
        setScope(value);

    }

    const addOrderlyKey = async () => {
        const privKey = ed.utils.randomPrivateKey(); // Secure random private key
        const pubKey = await ed.getPublicKeyAsync(privKey);
        const orderlyKeyPair = {
            publicKey: `ed25519:${ethers.encodeBase58(pubKey)}`,
            privateKey: ethers.encodeBase58(privKey),
        }
        const eip721Data = getAddOrderlyKeyMsg(chainId, orderlyKeyPair, scope, expireTime);
        const signature = await signEIP721(userAddress, JSON.stringify(eip721Data));
        let msg: {[key: string]: any} = {};
        for (const [key, value] of Object.entries(eip721Data.message)) {
            if (key === 'chainId') {
                continue;

            }
            msg[key] = value;
        }
        setOrderlyKey({
            signature,
            userAddress,
            message:msg,
        }).then(res => {
            localStorage.setItem('orderly_key_private', orderlyKeyPair.privateKey);
            console.log('set orderlyKey res', res);
        })



    }
    return (

        <div>
            <p>expiration(h): <input type='number' value={expireTime} onChange={onChangeExpireTime}/></p>
            <p>scope:
                <select multiple onChange={onChangeScope} value={scope}>
                    <option value={KeyScopeEnum.READ}>{KeyScopeEnum.READ}</option>
                    <option value={KeyScopeEnum.TRADING}>{KeyScopeEnum.TRADING}</option>
                </select>
            </p>
            <button onClick={addOrderlyKey}>Add OrderlyKey</button>
        </div>
    )
}