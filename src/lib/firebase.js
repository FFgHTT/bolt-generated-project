import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDczFqfESOcXpE2oSH_Ih8lh86v7EgT6D4",
  authDomain: "tidycal-cea20.firebaseapp.com",
  projectId: "tidycal-cea20",
  storageBucket: "tidycal-cea20.firebasestorage.app",
  messagingSenderId: "87272726569",
  appId: "1:87272726569:web:0d552876baa31c9a117c38",
  measurementId: "G-N6E6BWSDVY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth functions
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = () => {
  return signOut(auth);
};
