import {useWalletConnect} from "../WalletConnectContext";
import {formatBalance} from "../utils/common";

export function AccountComponent() {
    const {wallet} = useWalletConnect()
    return (
        <div>
            <p>AccountId: {wallet.accounts[0]}</p>
            <p>ChainId: {parseInt(wallet.chainId)}</p>
            <p>Balance: {formatBalance(wallet.balance)}</p>



        </div>
    )
}