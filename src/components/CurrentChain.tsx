import {useWalletConnect} from "../WalletConnectContext";
import {useAppSelector} from "../store/store";
import {useEffect, useState} from "react";
import {SwapTokenInfoInterface} from "../interfaces/common.interface";
import {crossChainSwapDeposit, getCrossSwapStatus} from "../services/contract.service";
import {Box} from "@mui/material";
import TokenList from "./TokenList";


export default function CurrentChain() {
    const {chainId} = useWalletConnect();
    const [networkId, setnetworkId] = useState<string | null>(null);
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
                setnetworkId(key);
            }
        })

    }, [swapSupport, chainId]);

    const  getMessage = () => {
        const  transactionHash = "0x0e37acef7032cf34537adab1bd8c0e3b5cc558d9873684513d34a2bba1e51da0";
        getCrossSwapStatus(transactionHash).then(res =>{
            console.log('res', res);
        });
    };
    return (
        <Box sx={{width: '800px', border: '1px solid #ccc', padding: '10px'}}>
            <p>current chain id: {chainId}, network: {networkId}</p>
            <TokenList tokenList={tokenInfoList} networkId={networkId}/>

            <button onClick={getMessage}>get message by transactionHash</button>

        </Box>
    )
}