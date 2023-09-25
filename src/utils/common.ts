import BigNumber from "bignumber.js";
import {AbiCoder, encodeBase58, keccak256, solidityPackedKeccak256, decodeBase58} from "ethers";
import * as ed from '@noble/ed25519';

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

const base64url = function (aStr: string): string {
    return aStr.replace(/\+/g, '-').replace(/\//g, '_');
};

export async function signatureByOrderlyKey(message: string, privateKey: string) {
    const secretKey = decodeBase58(privateKey).toString(16);

    const u8 = Buffer.from(message);

    const signature = await ed.signAsync(u8, secretKey);

    const signHex = Buffer.from(signature).toString('base64');

    const b64 = base64url(signHex);
    const pubKey = await ed.getPublicKeyAsync(secretKey);
    const publicKey = `ed25519:${encodeBase58(pubKey)}`;
    return {
        signature: b64,
        privateKey,
        publicKey,
    };
}