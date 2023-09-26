export interface TokenInterface {
    token: string;
    balanceToken?: string;
    fullname: string;
    decimals: number;
    delisted: boolean;
    canCollateral: boolean;
    canShort: boolean;
    chainDetails: { chainId: string; contractAddress: string; decimal: number; withdrawFee: number }[];
    tokenHash: string;
    minimumWithdrawAmount: number;
}