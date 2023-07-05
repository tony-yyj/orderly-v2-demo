import React from "react";
import {useWalletConnect} from "../WalletConnectContext";
import {formatAddress} from "../utils/common";

export default function HeaderComponent() {
    const {wallet, hasProvider, connectMetamask} = useWalletConnect();


    return (
        <div>
            {!hasProvider &&
                <a href="https://metamask.io" target="_blank">
                    Install MetaMask
                </a>
            }

            {window.ethereum?.isMetaMask && !wallet.accounts.length &&

                <button onClick={connectMetamask}>
                    Connect wallet
                </button>
            }

            {hasProvider && wallet.accounts.length > 0 &&
                <div>

                    {formatAddress(wallet.accounts[0])}
                </div>
            }



        </div>
    )
}