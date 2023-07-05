import {AccountComponent} from "../components/account.component";
import {RegisterComponent} from "../components/register.component";
import {AddOrderlyKeyComponent} from "../components/add-orderly-key.component";

export default function HomePage() {


    return (
        <div>
            <AccountComponent/>
            <RegisterComponent/>
            <AddOrderlyKeyComponent/>


        </div>
    )
}