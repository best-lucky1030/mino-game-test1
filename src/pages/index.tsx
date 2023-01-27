import { useEffect, useState } from "react";
import Head from "next/head"
import Moralis from "moralis";
import axios from "axios";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import {
  useAccount,
  useNetwork
} from 'wagmi'

// Manage firebase
import { getDocs } from "firebase/firestore";
import { listInstance } from "../firebase/firebase.config";
import { saveNftData } from "../firebase/firebase";
// UI Components
import Header from "../components/Header"
import PageLoading from "../components/PageLoading";
import { NftType } from "../util/types";
import NftCard from "../components/NftCard";

import { MORALIS_API_KEY } from "../config";

export default function Home() {

  // get wallet address and connnected state from wagmi pachage
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  // Set Page data
  const [nfts, setNfts] = useState<NftType[]>([]);
  const [totalNfts, setTotalNfts] = useState(0);
  const [chainName, setChainName] = useState("");

  // Set page loading state
  const [pageLoading, setPageLoading] = useState(false);

  // Get all NFTs in wallet
  const getNfts = async (address: string, chainId: number) => {
    setPageLoading(true);
    setNfts([]);

    if (!Moralis.Core.isStarted) {
      // start Moralis server
      await Moralis.start({
        apiKey: MORALIS_API_KEY,
      });
    }

    // set chain for fetch nft data
    let chain: any;
    switch (chainId) {
      case 1:
        chain = EvmChain.ETHEREUM
        break;
      case 5:
        chain = EvmChain.GOERLI
        break;
      case 44114:
        chain = EvmChain.AVALANCHE
        break;
      case 137:
        chain = EvmChain.POLYGON
        break;
      case 250:
        chain = EvmChain.FANTOM
        break;
      case 56:
        chain = EvmChain.BSC
        break;
      default:
        chain = EvmChain.ETHEREUM
        break;
    }
    const response: any = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain
    });
    if (response) {
      const nftResult = response.jsonResponse.result;
      let filteredNfts: NftType[] = [];
      if (nftResult?.length !== 0) {

        const dbDataSnap = await getDocs(listInstance);
        const dbList = dbDataSnap.docs.map((item: any) => {
          return { ...item.data(), id: item.id };
        });

        for (let item of nftResult) {
          // fetch metadata from token uri
          const metadata = await axios.get(item.token_uri);

          let isFavoritedOfDb = false;
          const filtereItemOfDb = dbList.find((nft) => nft.tokenAddress === item.token_address && nft.tokenId === item.token_id)
          if (filtereItemOfDb) {
            isFavoritedOfDb = filtereItemOfDb.isFavorited;
          }
          filteredNfts.push({
            minterAddres: item.minter_address,
            ownerOf: item.owner_of,
            symbol: item.symbol,
            tokenAddress: item.token_address,
            tokenId: item.token_id,
            tokenUri: item.token_uri,
            name: metadata.data.name ? metadata.data.name : "",
            image: metadata.data.image ? metadata.data.image : "/img/demo.png",
            isFavorited: isFavoritedOfDb
          });
        }
      }
      setNfts(filteredNfts);
      setTotalNfts(response.jsonResponse.total);
    }
    setPageLoading(false);
  }

  // update nft favorite data
  const handleFavorite = async (nft: NftType, setLoading: Function) => {
    setLoading(true);
    const res = await saveNftData(nft);
    if (res) {
      let currentNfts = nfts;
      const index = nfts.findIndex((item) => item.tokenAddress === nft.tokenAddress && item.tokenId === nft.tokenId);
      currentNfts[index].isFavorited = !nft.isFavorited;
      setNfts(currentNfts);
    }
    setLoading(false);
    return res;
  }

  useEffect(() => {
    if (address && chain) {
      console.log(chain)
      getNfts(address, chain.id);
      setChainName(chain.name)
    }
    if (!isConnected) {
      setNfts([]);
    }
  }, [address, isConnected, chain])
  return (
    <>
      <Head>
        <title>NFT List</title>
        <meta name="description" content="Set favorite NFTs in your wallet | For all chains" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-[100vh] bg-[#3f3f3f] relative z-0">
        <Header />
        <div className="container mx-auto pt-20 pb-20">
          {!pageLoading &&
            <h2 className="text-[16px] text-bold text-white mb-2">You have <span className="text-[#6bec3a]">{totalNfts}</span> {chainName} NFTs on your wallet</h2>
          }
          <div className="flex flex-wrap gap-6">
            {nfts.map((nft, key) => (
              <NftCard key={key} nftData={nft} handleFavorite={handleFavorite} />
            ))}
          </div>
        </div>
      </main>
      <PageLoading loading={pageLoading} />
    </>
  )
}
