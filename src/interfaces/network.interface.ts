export interface NetworkConfigInterface {
    chainNameShort: string;
    chainLogo: string;
    chainInfo: {
        chainId: string;
        chainName: string;
        nativeCurrency: {
            name: string;
            symbol: string;
            decimals: number;
            fix: number;
        };
        rpcUrls: string[];
        blockExplorerUrls: string[];
    };
    minGasBalance: number;
    minCrossGasBalance: number;
    maxPrepayCrossGas: number;
    blockExplorerName: string;
    chainName: string;
    requestRpc: string;
}