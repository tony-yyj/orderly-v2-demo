import {useWalletConnect} from "../WalletConnectContext";
import {signDeposit} from "../services/contract.service";
import {SymbolEnum} from "../utils/contract";
import {useState} from "react";
import {getAccountId} from "../utils/common";
import {environment} from "../enviroments/environment";

export function DepositComponent() {
    const {wallet} = useWalletConnect();
    const [symbol, setSymbol] = useState<string>(SymbolEnum.USDC)
    const [amount, setAmount] = useState<number>(1)

    const chainId = parseInt(wallet.chainId)
    const userAddress = wallet.accounts[0];
    const deposit = () => {
        const accountId = getAccountId(userAddress, environment.brokerId);

        signDeposit(accountId, chainId, symbol, SymbolEnum.Vault, amount).then();

    }

    return (
        <div>
            Deposit
            <p>
                Symbol:
                <select onChange={e => setSymbol((e.target as HTMLSelectElement).value)} value={symbol}>
                    {Object.keys(SymbolEnum).map(key => <option key={key} value={key}>{key}</option>)}
                </select>
            </p>
            <p>
                Amount:
                <input type='number' value={amount} onChange={e => setAmount(parseInt((e.target as HTMLInputElement).value))}/>
            </p>

            <button onClick={deposit}>Deposit</button>
        </div>
    )
}