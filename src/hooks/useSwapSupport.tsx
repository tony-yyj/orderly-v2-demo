import {useCallback, useEffect, useState} from "react";
import {useAppSelector} from "../store/store";
export interface NetWorkInterface {
    name: string;
    chainId: number;
    bridgeless: boolean;
}
export default function useSwapSupport() {
    const swapSupport = useAppSelector((state) => state.woofiSwap.swapSupport);
    const tokenList = useAppSelector(state => state.asset.tokenList);
    const getNetwork = useCallback(() => {
        console.log('-- test', swapSupport, tokenList);
        let mainnet: NetWorkInterface[] = [];
        let testnet: NetWorkInterface[] = [];
        if (!swapSupport || !tokenList) {
            mainnet = [];
            testnet = [];
            return {
                mainnet,
                testnet,
            }
        }
        const usdcToken = tokenList!.find((item) => item.token === 'USDC');
        if (usdcToken) {
            const orderlyChainIdObj: any = {};
            usdcToken.chainDetails.forEach((item) => {
                orderlyChainIdObj[item.chainId] = item;
            });
            Object.keys(swapSupport!).forEach((key) => {
                const netData = swapSupport![key];
                if (!netData.network_infos.bridge_enable) {
                    return;
                }
                if (netData.network_infos.mainnet) {
                    mainnet.push({
                        name: netData.network_infos.name,
                        chainId: netData.network_infos.chain_id,
                        bridgeless: !!orderlyChainIdObj[netData.network_infos.chain_id.toString()],
                    });
                } else {
                    testnet.push({
                        name: netData.network_infos.name,
                        chainId: netData.network_infos.chain_id,
                        bridgeless: !!orderlyChainIdObj[netData.network_infos.chain_id.toString()],
                    });
                }
            });
        }
        console.log('-- testnet', testnet, mainnet);
        return {
            mainnet,
            testnet,
        }

    }, [swapSupport, tokenList]);


    return {
        getNetwork,
    }

};