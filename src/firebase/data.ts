import { initializeApp } from "firebase/app";
import {collection, getFirestore} from "firebase/firestore"
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_UUAaRKt3dP_aAJvGV0RkoBdnYhIijYs",
  authDomain: "cinematic-ef8f9.firebaseapp.com",
  projectId: "cinematic-ef8f9",
  storageBucket: "cinematic-ef8f9.appspot.com",
  messagingSenderId: "701544043474",
  appId: "1:701544043474:web:4f82de644a4678e230ee0b",
  measurementId: "G-WK51YF93HZ"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

export const firebaseData={
    database: getFirestore(app),
    authProvider: provider,
    likedMoviesCollection: collection(getFirestore(app), "LikedMovies"),
}