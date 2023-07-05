import BigNumber from "bignumber.js";

export const formatBalance = (rawBalance: string) => {
    const balance = new BigNumber(rawBalance).shiftedBy(-18).toFormat(2);
    return balance;
}

export const formatAddress = (address: string) => {
    return `${address.substring(0, 4)}...${address.substring(address.length-4, address.length)}`
}