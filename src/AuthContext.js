import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user);
      setCurrentUser(user);
      if (user) {
        try {
          const roleDoc = await getDoc(doc(db, 'roles', user.uid));
          if (roleDoc.exists()) {
            console.log('Role data:', roleDoc.data());
            setRole(roleDoc.data().role);
          } else {
            setRole('user'); // Default role if none is set
          }
        } catch (error) {
          console.error("Error fetching role:", error);
          setRole('user'); // Default role if there's an error
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    role,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
