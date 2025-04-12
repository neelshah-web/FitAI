import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut, updatePassword as firebaseUpdatePassword } from "firebase/auth";

// Create the context
export const AuthContext = createContext();

// AuthProvider component to provide context to the rest of the app
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Load from localStorage if the user is already logged in
    return JSON.parse(localStorage.getItem("currentUser")) || null;
  });

  const [bmiData, setBmiData] = useState(() => {
    // Load BMI data from sessionStorage if it exists
    return JSON.parse(sessionStorage.getItem("bmiData")) || null;
  });

  // Set the current user when the auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); // Update the context when user logs in or out
        localStorage.setItem("currentUser", JSON.stringify(user)); // Save to localStorage
      } else {
        setCurrentUser(null); // Update when user logs out
        localStorage.removeItem("currentUser"); // Remove from localStorage
      }
    });

    return unsubscribe;
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase
      setCurrentUser(null); // Set the currentUser state to null on logout
      localStorage.removeItem("currentUser"); // Remove from localStorage
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Function to set BMI data
  const setUserBmiData = (data) => {
    setBmiData(data); // Update the BMI data in state
    sessionStorage.setItem("bmiData", JSON.stringify(data)); // Persist BMI data in sessionStorage
  };

  // Function to update user password
  const updatePassword = async (newPassword) => {
    if (!currentUser) {
      throw new Error("No user is logged in.");
    }

    try {
      await firebaseUpdatePassword(currentUser, newPassword); // Firebase function to update password
      return "Password updated successfully";
    } catch (error) {
      throw new Error(error.message); // Return error if update fails
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, logout, bmiData, setUserBmiData, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
