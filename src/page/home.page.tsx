import {AccountComponent} from "../components/account.component";
import {RegisterComponent} from "../components/register.component";
import {AddOrderlyKeyComponent} from "../components/add-orderly-key.component";
import {ApproveTokenComponent} from "../components/approve-token.component";
import {DepositComponent} from "../components/deposit.component";
import {WithdrawComponent} from "../components/withdraw.component";

export default function HomePage() {


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