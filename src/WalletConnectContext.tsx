import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import detectEthereumProvider from "@metamask/detect-provider";

export interface IWalletConnectContextValue {
    connectMetamask: () =>void;
    wallet: Walletstate;
    hasProvider: boolean;
}

interface IWalletConnectContextProviderProps {
    children: any;
}

interface Walletstate {
    accounts: any[];
    balance: string;
    chainId: string;
}

export const WalletConnectContext = React.createContext<IWalletConnectContextValue | null>(null)


const disconntedState: Walletstate = {
    accounts: [],
    balance: '',
    chainId: '',
}

export const WalletConnectContextProvider = ({children}: IWalletConnectContextProviderProps) => {
    const [wallet, setWallet] = useState(disconntedState);
    const [hasProvider, setHasProvider] = useState<boolean>(false);


    const _updateWallet = useCallback(async (providedAccounts?: any) => {
        const accounts = providedAccounts || await window.ethereum.request(
            {method: 'eth_accounts'},
        )
        if (accounts.length === 0) {
            setWallet(disconntedState);
            return;
        }

        const chainId = await window.ethereum.request({
            method: 'eth_chainId',
        });

        const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest'],
        })
        setWallet({
            accounts,
            chainId,
            balance,
        })
    }, [])

    const updateWalletAndAccount = useCallback(() => _updateWallet(), [_updateWallet]);
    const updateWallet = useCallback((accounts: any) => _updateWallet(accounts), [_updateWallet])

    useEffect(() => {
        const getProvider = async () => {
            const provider = await detectEthereumProvider({silent: true});
            setHasProvider(Boolean(provider));
            if (provider) {
                updateWalletAndAccount().then();
                window.ethereum.on('accountChanged', updateWallet);
                window.ethereum.on('chainChanged', updateWalletAndAccount);
            }

        }

        getProvider().then();

        return () => {
            window.ethereum.removeListener('accountChanged', updateWallet);
            window.ethereum.removeListener('chainChanged', updateWalletAndAccount);

        }
    })

    const connectMetamask = async () => {
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })
            updateWallet(accounts);
        } catch (e) {
            console.log('e', e);
        }
    };

    const providerValue = useMemo(
        () => ({
            connectMetamask,
            wallet,
            hasProvider,
        }),
        [wallet, hasProvider, connectMetamask],
    );
    return (
        <WalletConnectContext.Provider value={providerValue}>
            {children}
        </WalletConnectContext.Provider>
    )
}

export function useWalletConnect() {
    const context = useContext(WalletConnectContext);
    if (!context) {
        throw new Error('useWalletConnect must be used within a WalletConnectProvider')
    }
    return context;

}