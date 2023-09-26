import {ethers, parseUnits} from "ethers";
import {contracts} from "../utils/contract";
import {calculateStringHash, getAccountId} from "../utils/common";
import {environment} from "../enviroments/environment";


export async function crossChainSwapDeposit(
    {
        userAddress,
        srcBridgeAmount,
        slippage,
        src,
        dst,
    }: {
        userAddress: string
        srcBridgeAmount: string,
        slippage: string;
        src: {
            network: string;
            token: string;
            decimal: string;
        },
        dst: {
            network: string;
            token: string;
        };
    }
) {
    // dst value
    const brokerHash = calculateStringHash(environment.config.brokerId);
    // det woofipro token
    const tokenHash = calculateStringHash('USDC');
    const accountId = getAccountId(userAddress, environment.config.brokerId);
    const dstVaultDepoist = {
        accountId,
        brokerHash,
        tokenHash,
    };
    console.log('src', src);
    const bridgeAmount = parseUnits(srcBridgeAmount,Number(src.decimal));
    const queryParams = {
        src_network:src.network,
        dst_network:dst.network,
        src_token:src.token,
        dst_token: dst.token,
        src_amount: bridgeAmount.toString(),
        slippage: slippage,
    }
    const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

    console.log('queryString', queryString);
    const url = `${environment.config.swapSupportApiUrl}/woofi_dex/cross_chain_swap?${queryString}`;
    const priceData = fetch(url).then(response => response.json());
    console.log('price data', priceData);
}
