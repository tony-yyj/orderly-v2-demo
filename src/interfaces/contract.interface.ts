export interface DstInfos {
    network: string;
    chain_id: number;
    bridged_token: string;
    to_token: string;
    min_to_amount: string;
}

export interface SrcInfos {
    network: string;
    from_token: string;
    from_amount: string;
    bridge_token: string;
    min_bridge_amount: string;
}

export interface DstOutcomes {
    "token": string;
    "symbol": string;
    "decimals": number;
    "amount": string;
    "to_token_insufficient": boolean;
}

export interface FeesFrom {
    "woofi": string;
    "stargate": string;
    "total": string;
}


export type RouteInfos = {
    [key in 'src‘ | ’dst']: {
        "tokens": string[];
        "symbols": string[];
        "amounts": string[];
        "decimals": number[];
    };
};

export interface CrossSwapResponseInterface{
   status: string;
   error: {
       message: string;
   }
   data: {
       dst_outcomes: DstOutcomes;
       fees_from: FeesFrom;
       mark_price: string;
       price: string;
       route_infos: RouteInfos;
       src_infos: SrcInfos;
       dst_infos: DstInfos;

   }
}

export  type ICrossChainContractAbi = readonly [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "components": [
                    {
                        "internalType": "uint16",
                        "name": "chainId",
                        "type": "uint16"
                    },
                    {
                        "internalType": "address",
                        "name": "bridgedToken",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "toToken",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minToAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "airdropNativeAmount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct IWOOFiDexCrossChainRouter.DstInfos",
                "name": "dstInfos",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "accountId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "brokerHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "tokenHash",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct IWOOFiDexCrossChainRouter.DstVaultDeposit",
                "name": "dstVaultDeposit",
                "type": "tuple"
            }
        ],
        "name": "quoteLayerZeroFee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "nativeAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "zroAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "to",
                "type": "address"
            },
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "fromToken",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "fromAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "bridgeToken",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minBridgeAmount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct IWOOFiDexCrossChainRouter.SrcInfos",
                "name": "srcInfos",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "uint16",
                        "name": "chainId",
                        "type": "uint16"
                    },
                    {
                        "internalType": "address",
                        "name": "bridgedToken",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "toToken",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minToAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "airdropNativeAmount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct IWOOFiDexCrossChainRouter.DstInfos",
                "name": "dstInfos",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "accountId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "brokerHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "tokenHash",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct IWOOFiDexCrossChainRouter.DstVaultDeposit",
                "name": "dstVaultDeposit",
                "type": "tuple"
            }
        ],
        "name": "crossSwap",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
]