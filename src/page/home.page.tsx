import {AccountComponent} from "../components/account.component";
import {RegisterComponent} from "../components/register.component";
import {AddOrderlyKeyComponent} from "../components/add-orderly-key.component";
import {ApproveTokenComponent} from "../components/approve-token.component";

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


        </div>
    )
}