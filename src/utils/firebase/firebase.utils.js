// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGhdiK3idKZkUPteh3ftJotBwYb_V25SU",
  authDomain: "ecommerce-app-db-4d628.firebaseapp.com",
  projectId: "ecommerce-app-db-4d628",
  storageBucket: "ecommerce-app-db-4d628.appspot.com",
  messagingSenderId: "431830881427",
  appId: "1:431830881427:web:60813c71109134110c2966",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalUserInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth.uid;
    const createdOn = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdOn,
        ...additionalUserInformation,
      });
    } catch (error) {
      console.log("error in creation of user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  createUserWithEmailAndPassword(auth, email, password);
};
