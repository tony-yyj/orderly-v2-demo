import HeaderComponent from "../components/header.component";
import Network from "../components/Network";
import CurrentChain from "../components/CurrentChain";


export default function HomePage() {

    return (
        <div>
            <HeaderComponent/>
            <Network/>
            <CurrentChain/>


        </div>
    )
}