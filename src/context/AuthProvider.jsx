import React, { useEffect, useState } from "react";
import { app } from "../firebase/firebase.config.js";
import { AuthContext } from "./AuthContext.jsx";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      setSearchText(query);
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }
      const res = await axios.get(
        `https://dev-dialogue-server.vercel.app/posts/search?tag=${encodeURIComponent(query)}`
      );
      setSearchResults(res.data);
    } catch (error) {
      console.error("Error searching posts:", error);
      setSearchResults([]);
    }
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const logout = () => {
    return signOut(auth);
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    logout,
    login,
    loading,
    setLoading,
    updateUser,
    loginWithGoogle,
    searchText,
    searchResults,
    handleSearch,
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
