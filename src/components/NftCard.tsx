/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react"
import { NftType } from "../util/types"

export default function NftCard(props: {
    nftData: NftType,
    handleFavorite: Function
}) {
    const { nftData, handleFavorite } = props;
    const [isFavorited, setIsFavorited] = useState(nftData.isFavorited);
    const [loading, setLoading] = useState(false)

    // update nft favorite data
    const onFavorite = () => {
        const res = handleFavorite(nftData, setLoading);
        // handleFavorite() returns true/false
        // true: success 
        // false: fault
        if (res) {
            setIsFavorited(!isFavorited);
        }
    }

    return (
        <div className="w-[236px] bg-[#222] relative">
            <img
                src={nftData.image}
                className="w-[236px]"
                alt=""
            />
            {/* favorite icon button beginning */}
            <div className="absolute right-0 top-0 mr-2 mt-2">
                <button onClick={onFavorite}>
                    {isFavorited ?
                        <img
                            className="w-8 h-8"
                            src="/img/favorite.svg"
                            alt=""
                        />
                        :
                        <img
                            className="w-8 h-8"
                            src="/img/favorite-outline.svg"
                            alt=""
                        />
                    }
                </button>
                {loading &&
                    <p className="absolute top-10 right-0 text-[10px] text-white">saving....</p>
                }
            </div>
            {/* favorite icon button end */}

            {/* NFT name */}
            <div className="p-2">
                <p className="text-white font-bold text-[14px]">{nftData.name}</p>
            </div>
        </div>
    )
}
