import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCg8r7z5c3vcCivq765kUisO68hJ5bdADI",
  authDomain: "crwn-clothing-db-2b4af.firebaseapp.com",
  projectId: "crwn-clothing-db-2b4af",
  storageBucket: "crwn-clothing-db-2b4af.appspot.com",
  messagingSenderId: "598011997245",
  appId: "1:598011997245:web:0eb5de6a6b307898920e54",
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userCredential: UserCredential,
  displayNameProps?: string
) => {
  const userDocRef = doc(db, "users", userCredential.user.uid);

  const userSnapshot = await getDoc(userDocRef);

  const notExist = !userSnapshot.exists();

  if (notExist) {
    const { displayName, email } = userCredential.user;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName: displayName ?? displayNameProps,
        email,
        createdAt,
      });
    } catch (error: any) {
      console.error("Erro ao criar usuario", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const response = await createUserWithEmailAndPassword(auth, email, password);

  return response;
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const response = await signInWithEmailAndPassword(auth, email, password);

  return response;
};
