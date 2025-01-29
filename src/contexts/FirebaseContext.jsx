import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const FirebaseContext = createContext({});

export function FirebaseProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Setting up auth state listener...'); // Debug log
    const unsubscribe = onAuthStateChanged(auth, 
      (user) => {
        console.log('Auth state changed:', user ? 'User logged in' : 'No user'); // Debug log
        setUser(user);
        setLoading(false);
      },
      (error) => {
        console.error('Auth state error:', error); // Debug log
        setError(error);
        setLoading(false);
      }
    );

    return () => {
      console.log('Cleaning up auth state listener...'); // Debug log
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    error,
    setError
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => useContext(FirebaseContext);
