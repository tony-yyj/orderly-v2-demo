import injectedModule from "@web3-onboard/injected-wallets";
import Onboard from "@web3-onboard/core";
import { useEffect } from "react";
import { encodeBase58 } from "ethers";
import { log } from "console";

export default function ConnectWalletComponent() {

    const apiKey= 'a2c206fa-686c-466c-9046-433ea1bf5fa6';
    const injected =  injectedModule();
    const infuraKey = '3039f275d050427d8859a728ccd45e0c';
    const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`

    const onboard = Onboard({
        apiKey,
        wallets: [injected],
        chains: [
            {
                id: '0x1',
                token: 'ETH',
                label: 'Ethereum Mainnet',
                rpcUrl
            }
        ]
    })


    const connectWallet =  async () => {
        const wallets = await onboard.connectWallet();
        console.log('wallets', wallets);
    }


    return (
        <div>
            <button onClick={connectWallet}>connect aa</button>

        </div>
    )
}