import Onbard, { InitOptions, OnboardAPI } from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import { init } from '@web3-onboard/react';
import {getNetworkListArray, NetworkInterface} from './network.util';

const WOOFiProLogo = `${process.env.PUBLIC_URL}/images/woofipro-blocknative.svg`;
const WOOFiProIcon = `${process.env.PUBLIC_URL}/images/woofipro-icon.svg`;

const apiKey = 'a2c206fa-686c-466c-9046-433ea1bf5fa6';
const injected = injectedModule();
export const initBlockNativeData: InitOptions = {
    apiKey,
    connect: {
        autoConnectAllPreviousWallet: true,
    },
    wallets: [injected],
    chains: getNetworkListArray().map((network: NetworkInterface) => {
        return {
            id: network.chainId,
            token: network.token,
            label: network.label,
            rpcUrl: network.requestRpc,
        }
    }),
    appMetadata: {
        name: 'WOOFi Pro',
        logo: WOOFiProLogo,
        icon: WOOFiProIcon,
        description: 'WOOFi Pro',
        recommendedInjectedWallets: [{ name: 'MetaMask', url: 'https://metamask.io' }],
        agreement: {
            version: '1.0.0',

            termsUrl: 'https://learn.woo.org/woofi/terms-of-use',
            privacyUrl: 'https://learn.woo.org/woofi/privacy-policy',
        },
        gettingStartedGuide: 'https://blocknative.com',
        explore: 'https://blocknative.com',
    },
    accountCenter: {
        desktop: {
            enabled: false,
        },
        mobile: {
            enabled: false,
        },
    },
    theme: 'dark',
};

export const initWeb3Onboard = init(initBlockNativeData);
