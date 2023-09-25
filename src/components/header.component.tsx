import React, {useEffect} from "react";
import {formatAddress} from "../utils/common";
import {useWalletConnect} from "../WalletConnectContext";

export default function HeaderComponent() {
    const {userAddress, connect} = useWalletConnect();


    return (
        <div>

            {userAddress ?


                <div>

                    {formatAddress(userAddress)}
                </div>
                :
                <button onClick={() => connect()}>
                    connect wallet
                </button>
            }


        </div>
    )
}