import React, {useEffect} from "react";
import {formatAddress} from "../utils/common";
import {useWalletConnect} from "../WalletConnectContext";
import {Box} from "@mui/material";

export default function HeaderComponent() {
    const {userAddress, connect} = useWalletConnect();


    return (
        <Box sx={{height: '48px', width: '100%', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
                dex-evm-demo
            </div>

            {userAddress ?


                <div>

                    {formatAddress(userAddress)}
                </div>
                :
                <button onClick={() => connect()}>
                    connect wallet
                </button>
            }


        </Box>
    )
}