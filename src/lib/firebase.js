import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
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

console.log('Initializing Firebase...'); // Debug log

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

export const signUp = async (email, password) => {
  console.log('Attempting signup...'); // Debug log
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('Signup successful:', userCredential); // Debug log
    return userCredential;
  } catch (error) {
    console.error('Signup error:', error.code, error.message); // Debug log
    throw error;
  }
};

export const signIn = async (email, password) => {
  console.log('Attempting signin...'); // Debug log
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Signin successful:', userCredential); // Debug log
    return userCredential;
  } catch (error) {
    console.error('Signin error:', error.code, error.message); // Debug log
    throw error;
  }
};

export const logOut = async () => {
  console.log('Attempting signout...'); // Debug log
  try {
    await signOut(auth);
    console.log('Signout successful'); // Debug log
  } catch (error) {
    console.error('Signout error:', error.code, error.message); // Debug log
    throw error;
  }
};

export const resetPassword = async (email) => {
  console.log('Attempting password reset...'); // Debug log
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent'); // Debug log
  } catch (error) {
    console.error('Password reset error:', error.code, error.message); // Debug log
    throw error;
  }
};
