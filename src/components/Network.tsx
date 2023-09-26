import {useAppSelector} from "../store/store";
import {useEffect, useState} from "react";
import useSwapSupport from "../hooks/useSwapSupport";
import {useWalletConnect} from "../WalletConnectContext";
import {getNetworkByChainId} from "../utils/network.util";
import {convertChainIdNumberToHex} from "../utils/common.util";
export interface NetWorkInterface {
    name: string;
    chainId: number;
    bridgeless: boolean;
}
interface NetWorkProps {
    net: NetWorkInterface;
}
const NetworkItem = ({net}: NetWorkProps) => {
    const {changeChain} = useWalletConnect();

    const onChangeChain = () => {
        const netConfig = getNetworkByChainId(`0x${(net.chainId).toString(16)}`);
        console.log('netconfig', netConfig);
        changeChain(convertChainIdNumberToHex(net.chainId));

    }


    return (
        <div onClick={onChangeChain}>
            <span>{net.name}</span>
            <span>{net.chainId}</span>
            <span>{net.bridgeless && '*'}</span>
        </div>
    )
};

export default function Network(){
    const [mainnet, setMainnet] = useState<NetWorkInterface[]>([]);
    const [testnet, setTestnet] = useState<NetWorkInterface[]>([]);
    const {getNetwork} = useSwapSupport();
    const swapSupport = useAppSelector((state) => state.woofiSwap.swapSupport);
    const tokenList = useAppSelector(state => state.asset.tokenList);

    useEffect(() => {
        const {testnet: testnetNew, mainnet: mainnetNew} = getNetwork();
        setMainnet(mainnetNew);
        setTestnet(testnetNew);

    }, [swapSupport, tokenList]);

    return (
        <div>
            <h2>Mainnet</h2>
            {mainnet.map((net) => (
                <NetworkItem key={net.chainId} net={net} />
            ))}
            <h2>Testnet</h2>
            {testnet.map((net) => (
                    <NetworkItem key={net.chainId} net={net} />
            ))}
        </div>
    )
}
