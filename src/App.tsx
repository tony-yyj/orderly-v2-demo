import React from 'react';
import './App.css';
import {WalletConnectContextProvider} from "./WalletConnectContext";
import HomePage from "./page/home.page";
import HeaderComponent from "./components/header.component";

function App() {
    return (
        <div className="App">
            <WalletConnectContextProvider>
                <HeaderComponent/>
                <HomePage/>

            </WalletConnectContextProvider>
        </div>
    );
}

export default App;
