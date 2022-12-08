import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { doc, getFirestore, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCg8r7z5c3vcCivq765kUisO68hJ5bdADI",
  authDomain: "crwn-clothing-db-2b4af.firebaseapp.com",
  projectId: "crwn-clothing-db-2b4af",
  storageBucket: "crwn-clothing-db-2b4af.appspot.com",
  messagingSenderId: "598011997245",
  appId: "1:598011997245:web:0eb5de6a6b307898920e54",
};

export const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (user: UserCredential) => {
  const userDocRef = doc(db, "users", user.user.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  console.log(userSnapshot.exists());
};
