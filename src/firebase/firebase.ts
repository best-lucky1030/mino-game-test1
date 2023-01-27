import { NftType } from "../util/types";
import {
  addDoc,
  doc,
  getDocs,
  updateDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { database, db, listInstance } from "./firebase.config";

export const saveNftData = async (nft: NftType) => {
  try {
    // set query to get documetn from firebase database
    const q = query(
      collection(db, "nfts"),
      where("tokenAddress", "==", nft.tokenAddress),
      where("tokenId", "==", nft.tokenId)
    );
    const querySnapshot = await getDocs(q);
    let id = ""; // collection id
    let regFlag = false; // register falg, true: already registered, false: new nft
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      id = doc.id;
      regFlag = true;
    });

    if (!regFlag) {
      console.log("save data!");
      await addDoc(listInstance, {
        minterAddres: nft.minterAddres,
        ownerOf: nft.ownerOf,
        symbol: nft.symbol,
        tokenAddress: nft.tokenAddress,
        tokenId: nft.tokenId,
        tokenUri: nft.tokenUri,
        image: nft.image,
        name: nft.name,
        isFavorited: !nft.isFavorited,
        createAt: new Date().getTime(),
        updateAt: new Date().getTime(),
      });
    } else {
      console.log("update data!");
      const collectionById = doc(database, "nfts", id);
      await updateDoc(collectionById, {
        isFavorited: !nft.isFavorited,
        updateAt: new Date().getTime(),
      });
    }

    return true;
  } catch (error) {
    console.log("nft save error: ", error);
    return false;
  }
};
