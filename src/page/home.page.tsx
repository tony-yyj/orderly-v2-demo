import HeaderComponent from "../components/header.component";
import Network from "../components/Network";
import CurrentChain from "../components/CurrentChain";
import Approve from "../components/Approve";


export default function HomePage() {

    return (
        <div>
            <HeaderComponent/>
            <Approve/>
            <Network/>
            <CurrentChain/>



        </div>
    )
}