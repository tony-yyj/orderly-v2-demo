import {ethers} from "ethers";

const definedTypes: { [key: string]: any } = {
    "EIP712Domain": [
        {name: "name", type: "string"},
        {name: "version", type: "string"},
        {name: "chainId", type: "uint256"},
        {name: "verifyingContract", type: "address"},
    ],
    "Registration": [
        {name: "brokerId", type: "string"},
        {name: "chainId", type: "uint256"},
        {name: "timestamp", type: "uint64"},
        {name: "registrationNonce", type: "uint256"}
    ],
    "Withdraw": [
        {name: "brokerId", type: "string"},
        {name: "chainId", type: "uint256"},
        {name: "receiver", type: "address"},
        {name: "token", type: "string"},
        {name: "amount", type: "uint256"},
        {name: "withdrawNonce", type: "uint64"},
        {name: "timestamp", type: "uint64"},
    ],
    "AddOrderlyKey": [
        {name: "brokerId", type: "string"},
        {name: "chainId", type: "uint256"},
        {name: "orderlyKey", type: "string"},
        {name: "scope", type: "string"},
        {name: "timestamp", type: "uint64"},
        {name: "expiration", type: "uint64"},
    ],
}

export function getDomain(chainId: number) {
    return {
        name: "Orderly",
        version: "1",
        chainId,
        verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
    };
}

export function getRegistrationMsg(brokerId: string, chainId: number, registrationNonce: number) {
    const primaryType = 'Registration';
    const timestamp = new Date().getTime();
    const typeDefinition = {
        "EIP712Domain": definedTypes["EIP712Domain"],
        [primaryType]: definedTypes[primaryType]
    }
    const message = {
        "brokerId": brokerId,
        "chainId": Number(chainId),
        "timestamp": timestamp,
        "registrationNonce": registrationNonce,
    }

    return {
        domain: getDomain(chainId),
        message: message,
        primaryType: 'Registration',
        types: typeDefinition,
    }
}

export async function signEIP721(accountId: string, data: string) {
    const method = "eth_signTypedData_v4"
    const params = [accountId, data]
    const signature = await window.ethereum.request({method, params})
    return signature

}

export function verifyEIP712(eip712Data: any, signature: string) {
    const domain = eip712Data["domain"]
    const type = {[eip712Data["primaryType"]]: eip712Data["types"][eip712Data["primaryType"]]}
    const message = eip712Data["message"]

    const recovered = ethers.verifyTypedData(domain, type, message, signature);
    console.log('recovered', recovered);
}