import {useWalletConnect} from "../WalletConnectContext";
import {useAppSelector} from "../store/store";
import {useEffect, useState} from "react";
import {SwapTokenInfoInterface} from "../interfaces/common.interface";
import {crossChainSwapDeposit} from "../services/contract.service";

const TokenInfoItem = ({tokenInfo}: {tokenInfo: SwapTokenInfoInterface}) => {
    const {userAddress} = useWalletConnect();
    const swapDeposit = () => {
        if (!userAddress) {
            return;
        }
        crossChainSwapDeposit({
            userAddress,
            srcBridgeAmount: '0.2',
            slippage: '1.5',
            src: {
                network: 'base',
                token: tokenInfo.address,
                decimal: tokenInfo.decimals.toString(),
            },
            dst: {
                network: 'arbitrum',
                token: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
            }
        }).then();

    };
    return (
        <p>
            {tokenInfo.address}
            &nbsp;
            {tokenInfo.symbol}
            <button onClick={swapDeposit}>Swap Deposit</button>
        </p>
    )

}

export default function CurrentChain(){
    const {chainId} = useWalletConnect();
    const [tokenInfoList, setTokenInfoList] = useState<SwapTokenInfoInterface[]>([]);
    const swapSupport = useAppSelector(state => state.woofiSwap.swapSupport);
    useEffect(() => {
        // const currentNet = swapSupport.
        if (!swapSupport || !chainId) {
            return;
        }
        Object.keys(swapSupport).forEach(key => {
             if (swapSupport[key].network_infos.chain_id === parseInt(chainId)) {
                 const tokenInfos = swapSupport[key].token_infos;
                 setTokenInfoList(tokenInfos.filter(item => item.swap_enable));
             }
        })

    }, [swapSupport, chainId]);

    return(
        <div>
            <p>current chain id: {chainId}</p>
                {tokenInfoList.map(tokenInfo =>
                    <TokenInfoItem key={tokenInfo.address} tokenInfo={tokenInfo}/>
                )}

        </div>
    )
}