// authUtils.js
import {
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../firebase"; // Adjust the import path as needed
import { toast } from "react-toastify";

export async function handleEmailSignup(email, password, name) {
  try {
    // Sign up with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Store user information in Firestore
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      name,
      email: user.email,
      role : "user",
      createdAt: new Date().toISOString(),
      // Add other user info you want to store
    });

    console.log("Email signup successful:", userCredential);
    toast.success("Account created and stored successfully!");
  } catch (error) {
    console.error("Error during email signup:", error);
    toast.error(
      "Error during email signup. Please check your details and try again."
    );
  }
}




export async function handlePhoneSignup(phoneNumber) {
  try {
    // Setup reCAPTCHA
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA solved");
        },
      },
      auth
    );
    const appVerifier = window.recaptchaVerifier;

    // Sign in with phone number
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier
    );
    window.confirmationResult = confirmationResult;
    console.log("SMS sent. Enter the code for verification.");

    // Prompt user to enter verification code (implement this in your UI)
    const verificationCode = prompt(
      "Enter the verification code sent to your phone:"
    );
    if (verificationCode) {
      await handleVerificationCode(verificationCode);
    }
  } catch (error) {
    console.error("Error during phone signup:", error);
    toast.error("Error during phone signup. Please try again.");
  }
}

async function handleVerificationCode(verificationCode) {
  try {
    // Confirm the verification code
    const result = await window.confirmationResult.confirm(verificationCode);
    const user = result.user;

    // Store user information in Firestore
    await setDoc(doc(db, "users", user.uid), {
      phoneNumber: user.phoneNumber,
      createdAt: new Date().toISOString(),
      // Add other user info you want to store
    });

    console.log("Phone signup successful:", result);
    toast.success("Account created and stored successfully!");
  } catch (error) {
    console.error("Error during verification code confirmation:", error);
    toast.error("Error during verification. Please try again.");
  }
}
