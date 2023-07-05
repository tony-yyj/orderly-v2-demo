import {AccountComponent} from "../components/account.component";
import {RegisterComponent} from "../components/register.component";
import {AddOrderlyKeyComponent} from "../components/add-orderly-key.component";
import {ApproveTokenComponent} from "../components/approve-token.component";
import {DepositComponent} from "../components/deposit.component";
import {WithdrawComponent} from "../components/withdraw.component";
import {useWalletConnect} from "../WalletConnectContext";

export default function HomePage() {
    const {wallet} = useWalletConnect();

    if (!wallet.accounts.length) {
       return (
           <div>pls connect metamask</div>
       )
    }

    return (
        <div>
            <AccountComponent/>
            <hr/>
            <RegisterComponent/>
            <hr/>
            <AddOrderlyKeyComponent/>
            <hr/>
            <ApproveTokenComponent/>
            <hr/>
            <DepositComponent/>
            <hr/>
            <WithdrawComponent/>


        </div>
    )
}