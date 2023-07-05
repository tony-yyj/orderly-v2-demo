import {useState} from "react";
import {SymbolEnum} from "../utils/contract";
import {signApprove} from "../services/contract.service";
import {useWalletConnect} from "../WalletConnectContext";

export function ApproveTokenComponent() {
    const {wallet} = useWalletConnect();
    const chainId = parseInt(wallet.chainId);
    const [symbol, setSymbol] = useState<string>(SymbolEnum.USDC)
    const [amount, setAmount] = useState<number>(1)

    const approve = () => {

        signApprove(chainId, symbol, SymbolEnum.Vault, amount).then();
    }

    return (
        <div>
            approve token
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
            <button onClick={approve}>Approve Token</button>
        </div>
    )
}