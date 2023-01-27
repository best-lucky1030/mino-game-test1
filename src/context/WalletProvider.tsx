/* eslint-disable @next/next/no-img-element */
import React, { createContext, useContext, useEffect, useState } from 'react'

import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import {
    getDefaultWallets,
    RainbowKitProvider,
    AvatarComponent,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { avalanche, bsc, mainnet, polygon, fantom, goerli } from 'wagmi/chains'

import '@rainbow-me/rainbowkit/styles.css';

// Rainbow config data
const CustomAvatar: AvatarComponent = () => {
    return (
        <img
            src="/img/ethereum.svg"
            style={{ borderRadius: "50%", width: 60, height: 60 }}
            alt=""
        />
    );
};
const { provider, chains } = configureChains(
    [mainnet, goerli, polygon, fantom, avalanche, bsc],
    [
        jsonRpcProvider({
            rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
        }),
    ]
);
const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
});
const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

export default function WalletContext(props: {
    children: React.ReactNode
}) {

    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} avatar={CustomAvatar}>
                {props.children}
            </RainbowKitProvider>
        </WagmiConfig>
    )
}
