import {ethers} from "ethers";
import {contracts, tokenHash} from "../utils/contract";
import {calculateStringHash} from "../utils/common";
import {environment} from "../enviroments/environment";

export async function signApprove(chainId: number, tokenSymbol: string, vaultSymbol: string, tokenAmount: number) {
    try {

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractInfo = contracts[chainId][tokenSymbol];
        const tokenContract = new ethers.Contract(contractInfo.address, contractInfo.abi, signer);
        const decimal = 6;
        const vaultAddress = contracts[chainId][vaultSymbol].address;
        const receipt = await tokenContract.approve(vaultAddress, ethers.parseUnits(String(tokenAmount), decimal))
        console.log('receipt', receipt);

    } catch (e) {
        console.log(e);
    }
}


export async function signDeposit(accountId: string, chainId: number, tokenSymbol: string, vaultSymbol: string, tokenAmount: number) {
    try {

        const brokerHash = calculateStringHash(environment.brokerId);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractInfo = contracts[chainId][vaultSymbol];
        const vaultContract= new ethers.Contract(contractInfo.address, contractInfo.abi, signer);
        const decimal = 6;

        // const receipt = await vaultContract.deposit(accountId, brokerHash, calculateStringHash(tokenSymbol), ethers.parseUnits(String(tokenAmount), decimal) )
        // 老合约用老hash
        const receipt = await vaultContract.deposit(accountId, brokerHash, tokenHash[tokenSymbol], ethers.parseUnits(String(tokenAmount), decimal) )
        console.log('receipt', receipt);


    } catch (e) {
        console.log(e);
    }
}
