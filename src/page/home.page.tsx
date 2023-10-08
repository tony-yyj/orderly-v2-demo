import HeaderComponent from "../components/header.component";
import Network from "../components/Network";
import CurrentChain from "../components/CurrentChain";
import Approve from "../components/Approve";
import {Box} from "@mui/material";


export default function HomePage() {

    return (
        <Box sx={{maxWidth: '960px', margin: '0 auto'}}>
            <HeaderComponent/>
            <Network/>
            <CurrentChain/>



        </Box>
    )
}