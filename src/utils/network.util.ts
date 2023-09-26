import {NetworkConfigInterface} from "../interfaces/network.interface";


const networkConfig: {[key: string]: NetworkConfigInterface} = {
    ethereum: {
        chainNameShort: 'Ethereum',
        chainLogo: '',
        chainInfo: {
            chainId: `0x${(1).toString(16)}`,
            chainName: 'Ethereum Mainnet',
            nativeCurrency: {
                name: 'eth',
                symbol: 'ETH',
                decimals: 18,
                fix: 8,
            },
            rpcUrls: ['https://mainnet.infura.io/v3/9155d40884554acdb17699a18a1fe348'],
            blockExplorerUrls: ['https://etherscan.io/'],
        },
        minGasBalance: 0.002,
        minCrossGasBalance: 0.002,
        maxPrepayCrossGas: 0.025,
        blockExplorerName: 'EthScan',
        chainName: 'Ethereum Mainnet',
        requestRpc: 'https://rpc.ankr.com/eth',
    },
    avax: {
        chainInfo: {
            chainId: `0x${(43114).toString(16)}`, // '0xa86a'
            chainName: 'Avalanche',
            nativeCurrency: {
                name: 'avax',
                symbol: 'AVAX',
                decimals: 18,
                fix: 5,
            },
            rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
            blockExplorerUrls: ['https://snowtrace.io/'],
        },
        minGasBalance: 0.05,
        minCrossGasBalance: 0.15,
        maxPrepayCrossGas: 2,
        blockExplorerName: 'Snowtrace',
        chainName: 'Avalanche',
        chainNameShort: 'Avalanche',
        chainLogo: '',
        requestRpc: 'https://rpc.ankr.com/avalanche',
    },
    bsc: {
        chainInfo: {
            chainId: `0x${(56).toString(16)}`, // 0x38
            chainName: 'BNB Chain',
            nativeCurrency: {
                name: 'bnb',
                symbol: 'BNB',
                decimals: 18,
                fix: 6,
            },
            rpcUrls: ['https://bsc-dataseed1.binance.org/'],
            blockExplorerUrls: ['https://bscscan.com/'],
        },
        minGasBalance: 0.02,
        minCrossGasBalance: 0.02,
        maxPrepayCrossGas: 0.1,
        blockExplorerName: 'BscScan',
        chainName: 'Binance Smart Chain',
        chainNameShort: 'BNB Chain',
        requestRpc: 'https://rpc.ankr.com/bsc',
        chainLogo: '',
    },
    fantom: {
        chainInfo: {
            chainId: `0x${(250).toString(16)}`, // 0x38
            chainName: 'Fantom',
            nativeCurrency: {
                name: 'ftm',
                symbol: 'FTM',
                decimals: 18,
                fix: 4,
            },
            rpcUrls: ['https://rpcapi.fantom.network'],
            blockExplorerUrls: ['https://ftmscan.com/'],
        },
        minGasBalance: 1,
        minCrossGasBalance: 10,
        maxPrepayCrossGas: 60,
        blockExplorerName: 'FTMScan',
        chainName: 'Fantom',
        chainNameShort: 'Fantom',
        chainLogo: '',
        requestRpc: 'https://rpc.ankr.com/fantom',
    },
    polygon: {
        chainInfo: {
            chainId: `0x${(137).toString(16)}`,
            chainName: 'Polygon',
            nativeCurrency: {
                name: 'matic',
                symbol: 'MATIC',
                decimals: 18,
                fix: 4,
            },
            rpcUrls: ['https://rpc-mainnet.matic.network'],
            blockExplorerUrls: ['https://polygonscan.com/'],
        },
        minGasBalance: 0.1,
        minCrossGasBalance: 1,
        maxPrepayCrossGas: 30,
        blockExplorerName: 'Polygonscan',
        chainName: 'Polygon',
        chainNameShort: 'Polygon',
        requestRpc: 'https://rpc.ankr.com/polygon',
        chainLogo: '',
    },
    arbitrum: {
        chainInfo: {
            chainId: `0x${(42161).toString(16)}`,
            chainName: 'Arbitrum',
            nativeCurrency: {
                name: 'eth',
                symbol: 'ETH',
                decimals: 18,
                fix: 4,
            },
            rpcUrls: ['https://arb1.arbitrum.io/rpc'],
            blockExplorerUrls: ['https://arbiscan.io/'],
        },
        minGasBalance: 0.0002,
        minCrossGasBalance: 0.002,
        maxPrepayCrossGas: 0.03,
        blockExplorerName: 'Arbiscan',
        chainName: 'Arbitrum',
        chainNameShort: 'Arbitrum',
        requestRpc: 'https://arb1.arbitrum.io/rpc',
        chainLogo: '',
    },
    optimism: {
        chainInfo: {
            chainId: `0x${(10).toString(16)}`,
            chainName: 'Optimism',
            nativeCurrency: {
                name: 'eth',
                symbol: 'ETH',
                decimals: 18,
                fix: 4,
            },
            rpcUrls: ['https://mainnet.optimism.io'],
            blockExplorerUrls: ['https://optimistic.etherscan.io/'],
        },
        minGasBalance: 0.0002,
        minCrossGasBalance: 0.002,
        maxPrepayCrossGas: 0.03,
        blockExplorerName: 'Optimism',
        chainName: 'Optimism',
        chainNameShort: 'Optimism',
        requestRpc: 'https://rpc.ankr.com/optimism',
        chainLogo: '',
    },
    // zksync_goerli: {
    //   chainInfo: {
    //     chainId: `0x${(280).toString(16)}`,
    //     chainName: 'zkSync Era Goerli',
    //     nativeCurrency: {
    //       name: 'eth',
    //       symbol: 'ETH',
    //       decimals: 18,
    //       fix: 4
    //     },
    //     rpcUrls: ['https://zksync2-testnet.zksync.dev/'],
    //     blockExplorerUrls: ['https://goerli.explorer.zksync.io/']
    //   },
    //   minGasBalance: 0.0002,
    //   minCrossGasBalance: 0.002,
    //   maxPrepayCrossGas: 0.02,
    //   blockExplorerName: 'zkSync Era Goerli',
    //   chainName: 'zkSync Era Goerli',
    //   chainNameShort: 'zkSync Era Goerli',
    //   requestRpc: 'https://zksync2-testnet.zksync.dev/',
    //   chainLogo:  '',
    // },
    zksync: {
        chainInfo: {
            chainId: `0x${(324).toString(16)}`,
            chainName: 'zkSync Era',
            nativeCurrency: {
                name: 'eth',
                symbol: 'ETH',
                decimals: 18,
                fix: 4,
            },
            rpcUrls: ['https://zksync2-mainnet.zksync.io'],
            blockExplorerUrls: ['https://explorer.zksync.io/'],
        },
        minGasBalance: 0.0002,
        minCrossGasBalance: 0.002,
        maxPrepayCrossGas: 0.03,
        blockExplorerName: 'zkSync Era',
        chainName: 'zkSync Era',
        chainNameShort: 'zkSync Era',
        requestRpc: 'https://zksync2-mainnet.zksync.io/',
        chainLogo: '',
        // blockExplorerName: 'zkSync Era Goerli',
        // chainName: 'zkSync Era Goerli',
        // chainNameShort: 'zkSync Era Goerli',
        // requestRpc: 'https://zksync2-testnet.zksync.dev/',
        // chainLogo:  '',
    },
    polygon_zkevm: {
        chainInfo: {
            chainId: `0x${(1101).toString(16)}`,
            chainName: 'Polygon zkEVM',
            nativeCurrency: {
                name: 'eth',
                symbol: 'ETH',
                decimals: 18,
                fix: 4,
            },
            rpcUrls: ['https://zkevm-rpc.com'],
            blockExplorerUrls: ['https://zkevm.polygonscan.com/'],
        },
        minGasBalance: 0.0002,
        minCrossGasBalance: 0.002,
        maxPrepayCrossGas: 0.03,
        blockExplorerName: 'Polygon zkEVM',
        chainName: 'Polygon zkEVM',
        chainNameShort: 'Polygon zkEVM',
        requestRpc: 'https://zkevm-rpc.com',
        chainLogo: '',
    },
    linea: {
        chainInfo: {
            chainId: `0x${(59144).toString(16)}`,
            chainName: 'Linea',
            nativeCurrency: {
                name: 'eth',
                symbol: 'ETH',
                decimals: 18,
                fix: 4,
            },
            rpcUrls: ['https://rpc.linea.build'],
            blockExplorerUrls: ['https://lineascan.build/'],
        },
        minGasBalance: 0.0002,
        minCrossGasBalance: 0.002,
        maxPrepayCrossGas: 0.03,
        blockExplorerName: 'Linea',
        chainName: 'Linea',
        chainNameShort: 'Linea',
        requestRpc: 'https://rpc.linea.build',
        chainLogo: '',
    },
    base: {
        chainInfo: {
            chainId: `0x${(8453).toString(16)}`,
            chainName: 'Base Network',
            nativeCurrency: {
                name: 'eth',
                symbol: 'ETH',
                decimals: 18,
                fix: 4,
            },
            rpcUrls: ['https://developer-access-mainnet.base.org/'],
            blockExplorerUrls: ['https://basescan.org'],
        },
        minGasBalance: 0.0002,
        minCrossGasBalance: 0.002,
        maxPrepayCrossGas: 0.03,
        blockExplorerName: 'Base',
        chainName: 'Base',
        chainNameShort: 'Base',
        requestRpc: 'https://developer-access-mainnet.base.org/',
        chainLogo: '',
    },
    arbitrum_goerli: {
        chainInfo: {
            chainId: `0x${(421613).toString(16)}`,
            chainName: 'Arbitrum Goerli',
            nativeCurrency: {
                name: 'AGOR',
                symbol: 'AGOR',
                decimals: 18,
                fix: 4,
            },
            rpcUrls: ['https://goerli-rollup.arbitrum.io/rpc'],
            blockExplorerUrls: ['https://goerli-rollup-explorer.arbitrum.io/'],
        },
        minGasBalance: 0.0002,
        minCrossGasBalance: 0.002,
        maxPrepayCrossGas: 0.03,
        blockExplorerName: 'Base',
        chainName: 'Arbitrum Goerli',
        chainNameShort: 'Arbitrum Goerli',
        requestRpc: 'https://goerli-rollup.arbitrum.io/rpc',
        chainLogo: '',
    },
    bsc_testnet: {
        chainInfo: {
            chainId: `0x${(97).toString(16)}`,
            chainName: 'BNB Chain Testnet',
            nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18,
                fix: 4,
            },
            rpcUrls: ["https://data-seed-prebsc-1-s1.bnbchain.org:8545"],
            blockExplorerUrls: ['https://testnet.bscscan.com/'],
        },
        minGasBalance: 0.0002,
        minCrossGasBalance: 0.002,
        maxPrepayCrossGas: 0.03,
        blockExplorerName: 'Base',
        chainName: 'BNB Chain Testnet',
        chainNameShort: 'BNB Chain Testnet',
        requestRpc: 'https://data-seed-prebsc-1-s1.bnbchain.org:8545',
        chainLogo: '',
    }
};

export interface NetworkInterface {
    name: string;
    logo: string;
    chainId: string;
    label: string;
    token: string;
    requestRpc: string;
    explorerUrls: string[];
}

export const getNetworkListArray = (): NetworkInterface[] => {
    return Object.keys(networkConfig).map((key) => {
        return {
            name: networkConfig[key].chainNameShort,
            logo: networkConfig[key].chainLogo,
            chainId: networkConfig[key].chainInfo.chainId,
            label: networkConfig[key].chainInfo.chainName,
            token: networkConfig[key].chainInfo.nativeCurrency.symbol,
            requestRpc: networkConfig[key].requestRpc,
            explorerUrls: networkConfig[key].chainInfo.blockExplorerUrls,
        };
    });
};


export const getNetworkByChainId = (chainId: string | null) => {
    if (!chainId) {
        return null;
    }
    const network = getNetworkListArray().filter((item) => item.chainId === chainId);
    return network && network[0] ? network[0] : null;
};

export const getBlockExplorerUrl = (chainId: string | null) => {
    const network = getNetworkByChainId(chainId);
    return network ? network.explorerUrls[0] : null;
};

export const checkNetwork = (chainId: string, allowNets: { chainId: string }[]) => !!allowNets.find((net) => net.chainId === chainId);
