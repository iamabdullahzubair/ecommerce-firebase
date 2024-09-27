import React, { useState } from "react";
import AuthInput from "./common/AuthInput";
import ButtonTemplate from "../templates/ButtonTemplate";
import { Link, Navigate } from "react-router-dom";
import AuthBg from "./common/AuthBg";
import { toast } from "react-toastify";
import { handleEmailSignup } from "./authUtils"; // Ensure this function returns a promise
import { auth } from "../../firebase";
import { isEmail, validatePassword } from "./authHelper";

const Signup = () => {
  const user = auth.currentUser;

  // State for tracking signup status
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  if (user || isSignedUp) {
    return <Navigate to={"/"} />;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name) {
      toast.warn("Name is required");
      return;
    }

    if (!emailOrPhone) {
      toast.warn("Email or Phone Number is required");
      return;
    }

    if (isEmail(emailOrPhone)) {
      if (!password) {
        toast.warn("Password is required for email signup");
        return;
      }
      if (!validatePassword(password)) {
        toast.warn("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character");
        return;
      }

      try {
        await handleEmailSignup(emailOrPhone, password, name);
        setIsSignedUp(true); // Update state to trigger redirect
      } catch (error) {
        toast.error("Signup failed: " + error.message);
      }
    }
  }

  return (
    <div className="flex justify-between items-center mb-36">
      {/* bg */}
      <AuthBg />
      {/* input */}
      <div className="xl:mr-64 mx-auto ">
        <div className="flex flex-col justify-start text-lg w-80 gap-4">
          <p className="text-3xl font-bold -mb-2 dark:text-slate-300">
            Create an account
          </p>
          <p className="text-base dark:text-slate-400">
            Enter your details below
          </p>
          <form onSubmit={handleSubmit}>
            <AuthInput
              type="text"
              placeholder="Name"
              inputValue={name}
              setInputValue={setName}
            />
            <AuthInput
              type="text"
              placeholder="Email or Phone Number"
              inputValue={emailOrPhone}
              setInputValue={setEmailOrPhone}
            />
            <AuthInput
              type="password"
              placeholder="Password"
              inputValue={password}
              setInputValue={setPassword}
            />
            <ButtonTemplate
              type="submit"
              btnText={"Create Account"}
              btnWidth="w-full h-16 font-semibold text-base"
            />
          </form>

          <ButtonTemplate
            type="submit"
            btnText={"Sign up with Google"}
            btnColor="bg-white"
            btnTextColor="black"
            btnWidth="w-full h-16 font-semibold text-base dark:text-gray-900"
            border={true}
          />
          <p className="text-base text-center dark:text-slate-400">
            Already have an account?{" "}
            <Link
              className="font-bold text-gray-500 border-b-2 border-gray-500 pb-1 dark:text-slate-300"
              to={"/login"}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
