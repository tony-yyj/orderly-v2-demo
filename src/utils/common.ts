import BigNumber from "bignumber.js";
import {AbiCoder, keccak256, solidityPackedKeccak256} from "ethers";

export const formatBalance = (rawBalance: string) => {
    const balance = new BigNumber(rawBalance).shiftedBy(-18).toFormat(2);
    return balance;
}

export const formatAddress = (address: string) => {
    return `${address.substring(0, 4)}...${address.substring(address.length-4, address.length)}`
}

export function calculateStringHash(input: string) {
    return solidityPackedKeccak256(['string'], [input])
}

export function getAccountId(userAddress: string, brokerId: string) {
    const abicoder = AbiCoder.defaultAbiCoder()
    return keccak256(abicoder.encode(['address', 'bytes32'], [userAddress, calculateStringHash(brokerId)]))
}