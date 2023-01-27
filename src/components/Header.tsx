import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
    return (
        <header className="bg-[#333] py-1.5 fixed left-0 top-0 w-full z-10">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div className="text-white font-bold text-[32px]">My NFT</div>
                    <div className="">
                        <ConnectButton accountStatus="address" />
                    </div>
                </div>
            </div>
        </header>
    )
}
