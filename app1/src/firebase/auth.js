// firebase/auth.js
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Signup function
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User signed up: ", user);
    return user; // Return user after signup if needed
  } catch (error) {
    console.error("Signup error:", error.message);
    throw new Error(error.message); // Throw error to handle in your component
  }
};
