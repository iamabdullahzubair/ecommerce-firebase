import React, { useState } from "react";
import AuthBg from "./common/AuthBg";
import ButtonTemplate from "../templates/ButtonTemplate";
import AuthInput from "./common/AuthInput";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { isEmail, validatePassword } from "./authHelper";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {

  const navigate = useNavigate()
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      toast.warn("Email or Phone Number is required");
      return;
    }
    if (!password) {
      toast.warn("Password is required for email signup");
      return;
    }
    if (!validatePassword(password)) {
      toast.warn(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character"
      );
      return;
    }

    if (isEmail(email)) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        toast.success("Login success")
        console.log("User signed in:", user);
        navigate("/")
      } catch (error) {
        toast.error("Login error")
        console.error("Error signing in: ", error.message);
      }
    }
  }

  return (
    <div className="flex justify-between items-center mb-36">
      {/* bg */}
      <AuthBg />

      {/* input */}
      <div className="xl:mr-64 mx-auto">
        <div className="flex flex-col justify-start text-lg sm:w-80 gap-4">
          <p className="sm:text-3xl text-xl font-bold -mb-2 dark:text-slate-300">
            Login to Exclusive
          </p>
          <p className="sm:text-base text-sm dark:text-slate-400">
            Enter your details below
          </p>
          <form onSubmit={handleSubmit}>
            <AuthInput
              type="text"
              placeholder="Email or Phone Number"
              inputValue={email}
              setInputValue={setEmail}
            />
            <AuthInput
              type="password"
              placeholder="Password"
              inputValue={password}
              setInputValue={setPassword}
            />
            <div className="flex items-center justify-between">
              <ButtonTemplate
                type="submit"
                btnText={"Login"}
                btnWidth="sm:w-36 sm:h-16 w-20 h-10 sm:text-base text-sm"
              />

              <Link
                className="text-sm text-secondary  pb-1 dark:text-slate-300 hover:underline"
                to={"/login"}
              >
                Forget Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
