import {useState} from "react";
import {SymbolEnum} from "../utils/contract";
import {getAccountId} from "../utils/common";
import {environment} from "../enviroments/environment";
import {signDeposit} from "../services/contract.service";
import {useWalletConnect} from "../WalletConnectContext";
import {getWithdrawMsg, signEIP721} from "../utils/eip721";
import {getWithdrawNonce, withdrawToken} from "../utils/request.util";

export function WithdrawComponent() {
    const {wallet} = useWalletConnect();
    const [symbol, setSymbol] = useState<string>(SymbolEnum.USDC)
    const [amount, setAmount] = useState<number>(1)

    const chainId = parseInt(wallet.chainId)
    const userAddress = wallet.accounts[0];
    const withdraw = async () => {
        const accountId = getAccountId(userAddress, environment.brokerId);
        const res = await getWithdrawNonce(accountId);

        if (!res.success) {
           return;
        }
        const withdrawNonce = res.data.withdraw_nonce;
        const eip721Data = getWithdrawMsg(
            wallet.accounts[0],
            accountId,
            chainId,
            symbol,
            withdrawNonce,
            amount,
        );
        console.log('eip721Data', eip721Data);
        const signature = await signEIP721(userAddress, JSON.stringify(eip721Data));
        const params = {
            message: eip721Data.message,
            signature,
            userAddress,
            verifyingContract: eip721Data.domain.verifyingContract,
        }
        console.log('params', params)
        withdrawToken(accountId, params).then(res => {
            console.log('withdraw res', res);
        })

        // signDeposit(accountId, chainId, symbol, SymbolEnum.Vault, amount).then();

    }
    return (
        <div>
            Withdraw

            <p>
                Symbol:
                <select onChange={e => setSymbol((e.target as HTMLSelectElement).value)} value={symbol}>
                    {Object.keys(SymbolEnum).map(key => <option key={key} value={key}>{key}</option>)}
                </select>
            </p>
            <p>
                Amount:
                <input type='number' value={amount}
                       onChange={e => setAmount(parseInt((e.target as HTMLInputElement).value))}/>
            </p>

            <button onClick={withdraw}>Withdraw</button>
        </div>
    )
}