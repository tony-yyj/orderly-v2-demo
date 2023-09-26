import { BrowserProvider, ethers } from 'ethers';
import Web3, { Eip712TypedData } from 'web3';
import { environment } from '../enviroments/environment';

const definedTypes: { [key: string]: any } = {
    EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
    ],
    Registration: [
        { name: 'brokerId', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'registrationNonce', type: 'uint256' },
    ],
    Withdraw: [
        { name: 'brokerId', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'receiver', type: 'address' },
        { name: 'token', type: 'string' },
        { name: 'amount', type: 'uint256' },
        { name: 'withdrawNonce', type: 'uint64' },
        { name: 'timestamp', type: 'uint64' },
    ],
    AddOrderlyKey: [
        { name: 'brokerId', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'orderlyKey', type: 'string' },
        { name: 'scope', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'expiration', type: 'uint64' },
    ],
    SettlePnl: [
        { name: 'brokerId', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'settleNonce', type: 'uint64' },
        { name: 'timestamp', type: 'uint64' },
    ],
};

export function getDomain(chainId: number, onChainDomain?: boolean) {
    return {
        name: 'Orderly',
        version: '1',
        chainId,
        verifyingContract: onChainDomain ? '': '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    };
}

export function getRegistrationMsg(brokerId: string, chainId: number, registrationNonce: number) {
    const primaryType = 'Registration';
    const timestamp = new Date().getTime();
    const typeDefinition = {
        EIP712Domain: definedTypes.EIP712Domain,
        [primaryType]: definedTypes[primaryType],
    };
    const message = {
        brokerId: brokerId,
        chainId: Number(chainId),
        timestamp: timestamp,
        registrationNonce: registrationNonce,
    };

    return {
        domain: getDomain(chainId),
        message: message,
        primaryType: 'Registration',
        types: typeDefinition,
    };
}

export function getAddOrderlyKeyMsg(chainId: number, keyPair: any, scope: string[], expireTime: number = 0) {
    const primaryType = 'AddOrderlyKey';
    const timestamp = new Date().getTime();

    const expiration = 0
    const typeDefinition = {
        EIP712Domain: definedTypes.EIP712Domain,
        [primaryType]: definedTypes[primaryType],
    };
    const message = {
        brokerId: environment.config.brokerId,
        orderlyKey: keyPair.publicKey,
        scope: scope.join(','),
        chainId,
        timestamp: timestamp,
        expiration,
    };

    return {
        domain: getDomain(chainId),
        message: message,
        primaryType,
        types: typeDefinition,
    };
}

export function getWithdrawMsg(userAddress: string, chainId: number, token: string, withdrawNonce: number, amount: number) {
    const decimal = 6;
    const primaryType = 'Withdraw';
    const timestamp = new Date().getTime();

    const message = {
        brokerId: environment.config.brokerId,
        chainId,
        receiver: ethers.getAddress(userAddress),
        token,
        amount: ethers.parseUnits(String(amount), decimal).toString(),
        withdrawNonce,
        timestamp,
    };
    const typeDefinition = { EIP712Domain: definedTypes.EIP712Domain, [primaryType]: definedTypes[primaryType] };

    return {
        domain: getDomain(chainId, true),
        message: message,
        primaryType: primaryType,
        types: typeDefinition,
    };
}

export function getSettlePnlMsg(brokerId: string, chainId: number, settlePnlNonce: number) {
    const primaryType = 'SettlePnl';
    const timestamp = new Date().getTime();
    const typeDefinition = {
        EIP712Domain: definedTypes.EIP712Domain,
        [primaryType]: definedTypes[primaryType],
    };
    const message = {
        brokerId: brokerId,
        chainId: Number(chainId),
        timestamp: timestamp,
        settleNonce: settlePnlNonce,
    };

    return {
        domain: getDomain(chainId, true),
        message: message,
        primaryType,
        types: typeDefinition,
    };
}

export const signEIP712 = async (web3: Web3, userAddress: string, data: Eip712TypedData) =>
    // @ts-ignore
    web3.eth.signTypedData(userAddress, JSON.stringify(data)).catch((e) => e);

export function verifyEIP712(eip712Data: any, signature: string) {
    const domain = eip712Data.domain;
    const type = { [eip712Data.primaryType]: eip712Data.types[eip712Data.primaryType] };
    const message = eip712Data.message;

    const recovered = ethers.verifyTypedData(domain, type, message, signature);
    console.log('recovered', recovered);
}
