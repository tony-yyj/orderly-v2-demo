import {useWalletConnect} from "../WalletConnectContext";
import {getNonce, registerUser} from "../utils/request.util";
import {getRegistrationMsg, signEIP721, verifyEIP712} from "../utils/eip721";

export function RegisterComponent() {
    const {wallet} = useWalletConnect();


    const registration = async () => {
        try {
            const userAddress = wallet.accounts[0];
            const chainId = parseInt(wallet.chainId);

            const nonceRes = await getNonce(userAddress);
            console.log('nonceRes', nonceRes);

            const eip721Data = getRegistrationMsg('woofi_dex', chainId, nonceRes.data.registration_nonce);
            console.log('eip723Data', eip721Data);

            const signature = await signEIP721(userAddress, JSON.stringify(eip721Data))
            console.log('signatuer', signature);
            verifyEIP712(eip721Data, signature);
            const params = {
                message: eip721Data.message,
                signature,
                userAddress: userAddress,
            }
            registerUser(params).then(res => {
                console.log('res', res);
            })
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <div>
            <div>sender registration</div>
            <button onClick={registration}>Register</button>
        </div>
    )
}