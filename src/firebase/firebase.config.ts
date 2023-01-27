// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh8aa42GzglJc1CIXT9mstp5j5oWaUNUA",
  authDomain: "nft-fetch.firebaseapp.com",
  projectId: "nft-fetch",
  storageBucket: "nft-fetch.appspot.com",
  messagingSenderId: "254137078741",
  appId: "1:254137078741:web:aba1a79de5014e44e1635c",
  measurementId: "G-R5P6RNWZHS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const db = getFirestore();

export const listInstance = collection(database, "nfts");
