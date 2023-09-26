import React, {useEffect, useState} from 'react';
import './App.css';
import HomePage from "./page/home.page";
import {WalletConnectContextProvider} from "./WalletConnectContext";
import {OnboardAPI} from "@web3-onboard/core";
import {init} from "@web3-onboard/react";
import {initBlockNativeData} from "./utils/block-native.util";
import {Provider} from "react-redux";
import store from "./store/store";
import {WooFiSwapSupport} from "./services/common.service";
import {getTokenList} from "./services/asset.service";


function App() {

    WooFiSwapSupport().subscribe();
    getTokenList().subscribe();

    useEffect(() => {
        const onboard = init(initBlockNativeData);

    }, []);

    return (
        <div className="App">
            <Provider store={store}>
                <WalletConnectContextProvider>
                    <HomePage/>
                </WalletConnectContextProvider>
            </Provider>
        </div>
    );
}

export default App;
