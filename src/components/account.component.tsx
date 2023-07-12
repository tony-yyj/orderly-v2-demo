import {useEffect} from "react";
import {getAccountInfo, getClientInfo} from "../services/account.service";
import {useWalletConnect} from "../WalletConnectContext";
import {getAccountId} from "../utils/common";
import {environment} from "../enviroments/environment";

export function AccountComponent() {
    const {wallet} = useWalletConnect();
    const accountId = getAccountId(wallet.accounts[0], environment.brokerId);
    useEffect(() => {
        // getAccountInfo().then();
    }, [])


    const refresh = () => {
        getAccountInfo(accountId).then(res => {
            console.log('account info', res);
        });
        getClientInfo(accountId).then(res => {
            console.log('client info', res);
        })
    }

    return (
        <div>
            <h2>account</h2>
            <button onClick={refresh}>get account info</button>

        </div>
    )

}