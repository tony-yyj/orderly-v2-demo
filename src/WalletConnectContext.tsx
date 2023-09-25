import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { EIP1193Provider } from '@web3-onboard/common';
import { OnboardAPI, WalletState } from '@web3-onboard/core';
import { init, useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react';
import { toNumber } from 'ethers';
import Web3 from 'web3';

export interface IWalletConnectContextValue {
    userAddress: string | null;
    chainId: string | null;
    provider: EIP1193Provider | null;
    walletLabel: string | null;
    web3: Web3 | null;
    disconnectWallet: () => Promise<WalletState[] | null>;
    connect: () => Promise<WalletState[] | null>;
    changeChain: (chainId: string) => Promise<any>;
}

interface IWalletConnectContextProviderProps {
    children: any;
    onboard?: OnboardAPI;
}

const defaultContextValue: IWalletConnectContextValue = {
    userAddress: null,
    chainId: null,
    provider: null,
    walletLabel: null,
    web3: null,
    disconnectWallet: async () => null,
    connect: async () => null,
    changeChain: async () => null,
};

export const WalletConnectContext = React.createContext<IWalletConnectContextValue | null>(defaultContextValue);

let timeoutId: number | null = null;

export const WalletConnectContextProvider = ({ children, onboard }: IWalletConnectContextProviderProps) => {
    const [userAddress, setUserAddress] = useState<string | null>(null);
    const [chainId, setChainId] = useState<string | null>(null);
    const [provider, setProvider] = useState<EIP1193Provider | null>(null);
    const [walletLabel, setWalletLabel] = useState<string | null>(null);
    const [web3, setWeb3] = useState<Web3 | null>(null);

    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
    const [{ connectedChain }, setChain] = useSetChain();
    const connectedWallets = useWallets();

    const disconnectWallet = useCallback(async (): Promise<WalletState[] | null> => {
        if (!wallet) {
            return null;
        }
        return disconnect(wallet);
    }, [wallet]);

    const changeChain = useCallback(
        (chainId: string) => {
            return setChain({ chainId });
        },
        [setChain],
    );

    useEffect(() => {
        // can get change chain event
        if (connectedChain) {
            setChainId(toNumber(connectedChain.id).toString());
        }
    }, [connectedChain]);

    useEffect(() => {
        const throttleTime = 1000;

        const throttleFunction = () => {
            console.log('-- zhixing ----');
            console.log('wallet', wallet);
            console.log('-- connectedWallets', connectedWallets);
            if (!wallet) {

                bindProviderEvent(provider, true);
                setUserAddress(null);
                setChainId(null);
                setProvider(null);
                setWalletLabel(null);
                setWeb3(null);
                return;
            }
            if (wallet) {
                const currentWallet = {
                    provider: wallet.provider,
                    address: wallet.accounts[0].address,
                    label: wallet.label,
                    chainId: wallet.chains[0].id,
                };

                if (walletLabel !== currentWallet.label) {
                    setProvider(currentWallet.provider);
                    bindProviderEvent(currentWallet.provider);
                }
                setUserAddress(currentWallet.address);
                setChainId(currentWallet.chainId);
                setWalletLabel(currentWallet.label);
                // @ts-ignore
                setWeb3(new Web3(currentWallet.provider));
                console.log('userAddress', userAddress, currentWallet);

            }
        };

        const handleUpdate = () => {
            console.log('-- time', timeoutId, new Date().getTime(), wallet);
            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }

            timeoutId = window.setTimeout(throttleFunction, throttleTime);
        };

        handleUpdate();
    }, [wallet]);

    const onAccountsChanged = (accounts: string[]) => {
    };

    const bindProviderEvent = (provider: EIP1193Provider | null, isClear?: boolean) => {
        if (!provider) {
            return;
        }
        // provider.removeListener('chainChanged', this.handleChainChanged)
        provider.removeListener('accountsChanged', onAccountsChanged);
        // provider.removeListener('close', this.handleClose)
        // provider.removeListener('handleNetworkChanged', this.handleNetworkChanged)

        if (isClear) {
            return;
        }
        provider.on('accountsChanged', onAccountsChanged);
    };

    const providerValue = useMemo(
        () => ({
            userAddress,
            chainId,
            walletLabel,
            provider,
            disconnectWallet,
            connect,
            changeChain,
            web3,
        }),
        [userAddress, chainId, walletLabel, provider, disconnectWallet, connect, changeChain, web3],
    );
    return <WalletConnectContext.Provider value={providerValue}>{children}</WalletConnectContext.Provider>;
};

export function useWalletConnect() {
    const context = useContext(WalletConnectContext);
    if (!context) {
        throw new Error('useWalletConnect must be used within a WalletConnectProvider');
    }
    return context;
}
