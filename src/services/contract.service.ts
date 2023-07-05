import {ethers} from "ethers";
import {contracts} from "../utils/contract";

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
