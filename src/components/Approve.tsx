import {useWalletConnect} from "../WalletConnectContext";
import Web3 from "web3";
import erc20Abi from '../utils/erc20Abi.json';
import {environment} from "../enviroments/environment";
import {MaxUint256} from "ethers";
import {approveERC20Token} from "../services/contract.service";

export default function Approve() {
    const {userAddress, web3} = useWalletConnect();
    const approve = () => {
        if (!userAddress || !web3) {
            return;
        }
        approveERC20Token(userAddress, web3).then();



    };
    return (
        <div>
            <button onClick={approve}>Test Approve</button>
        </div>
    )
}