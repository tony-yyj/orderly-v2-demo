import {ethers, MaxUint256, parseUnits} from "ethers";
import {contracts} from "../utils/contract";
import {calculateStringHash, getAccountId} from "../utils/common";
import {environment} from "../enviroments/environment";
import {CrossSwapResponseInterface, ICrossChainContractAbi} from "../interfaces/contract.interface";
import Web3 from "web3";
import crossChainRouterAbi from '../utils/woofiDexCrossChainRouterAbi.json';
import erc20Abi from "../utils/erc20Abi.json";
import {getRegistrationMsg, signEIP712} from "../utils/eip712.util";

const GASLIMIT = '3000000';
const TIME_OUT = 60 * 60 * 1000;
export async function crossChainSwapDeposit(
    {
        userAddress,
        web3,
        srcBridgeAmount,
        slippage,
        src,
        dst,
    }: {
        userAddress: string
        web3: Web3,
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

    try {

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
    const priceData =  await fetch(url).then(response => response.json()) as CrossSwapResponseInterface;
    if (priceData.status !== 'ok'){
        throw(new Error(priceData.error.message))
    }
    console.log('price data', priceData);

    const crossChainRouterContract = new web3.eth.Contract(crossChainRouterAbi as unknown as ICrossChainContractAbi, environment.config.crossChainRouteAddress);
    const srcInfos = ({
        fromToken: priceData.data.src_infos.from_token,
        fromAmount: BigInt(priceData.data.src_infos.from_amount),
        bridgeToken: priceData.data.src_infos.bridge_token,
        minBridgeAmount: BigInt(priceData.data.src_infos.min_bridge_amount),
    });
    const dstInfos = ({
        chainId: priceData.data.dst_infos.chain_id,
        bridgedToken: priceData.data.dst_infos.bridged_token,
        toToken: priceData.data.dst_infos.to_token,
        minToAmount: BigInt(priceData.data.dst_infos.min_to_amount),
        airdropNativeAmount: BigInt(0),
    });

    //
    // const quotoLZFee = await crossChainRouterContract.methods.quoteLayerZeroFee(
    //     userAddress,
    //     dstInfos,
    //     (dstVaultDepoist)
    // ).call();
    // console.log('quotoLZFee', quotoLZFee);
    const txData = crossChainRouterContract.methods.crossSwap(
        userAddress,
        srcInfos,
        dstInfos,
        (dstVaultDepoist),
    ).encodeABI();

    const crossSwapResult = await crossChainRouterContract.methods.crossSwap(
       userAddress,
       srcInfos,
       dstInfos,
        (dstVaultDepoist),
    ).send({
        from: userAddress,
        // @ts-ignore
        gasPrice: await web3.eth.getGasPrice(),
        gasLimit: GASLIMIT,
        data: txData,
        value: '0',
        timeout: TIME_OUT,
    });

    console.log('cross swap result', crossSwapResult);

    }catch (e: any) {
        console.log('e', e);
        return new Error(e && e.message);

    }
}

export async function approveERC20Token(userAddress: string, web3: Web3) {
    const erc20Contract = new web3.eth.Contract(erc20Abi, '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA');
    // @ts-ignore;
    const txData = erc20Contract.methods.approve(environment.config.crossChainRouteAddress, MaxUint256.toString()).encodeABI();
    // @ts-ignore;
    erc20Contract.methods.approve(environment.config.crossChainRouteAddress, MaxUint256.toString()).send({
        from: userAddress,
        // @ts-ignore
        gasPrice: await web3.eth.getGasPrice(),
        gasLimit: GASLIMIT,
        data: txData,
        value: '0',
        timeout: TIME_OUT,
    }).then(res => {
        console.log(res);
    })
}

export async function signMessage(userAddress: string, web3: Web3, chainId: string) {
    const eip712Data = getRegistrationMsg(environment.config.brokerId, parseInt(chainId), 44);
    console.log('eip723Data', eip712Data);

    const signature = await signEIP712(web3, userAddress, eip712Data);

}
