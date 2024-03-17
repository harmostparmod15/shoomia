"use client";

import axios from "axios";
import { useState } from "react";

const SignUpComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // FUNCTION TO SIGN UP USER
  const signUpUser = async () => {
    console.log("btn clicked");
    console.log(username, password);
    await axios.post("http://localhost:3000/api/v1/user", {
      username,
      password,
    });
  };

  return (
    <div className="text-black bg-gradient-to-br from-slate-100 to-gray-200 w-full flex items-center h-screen">
      <div className="w-5/12 mx-auto py-12 shadow-lg bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-center  ">Create an Account.</h1>
        <p className="text-center opacity-40 my-4 text-sm">
          Create an account to enjoy all servces
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="my-8 flex flex-col items-center justify-center gap-8"
        >
          <input
            placeholder="Full Name"
            className="w-6/12 py-2  border-b-2 "
          ></input>
          <input
            onChange={(e) => setUsername(e.target?.value)}
            placeholder="Email Address"
            className="w-6/12 py-2  border-b-2 "
          ></input>
          <input
            onChange={(e) => setPassword(e.target?.value)}
            placeholder="Password"
            className="w-6/12 py-2  border-b-2 "
          ></input>
          <input
            placeholder="Confirm Password"
            className="w-6/12 py-2  border-b-2 "
          ></input>

          <button
            onClick={signUpUser}
            className="mt-4 bg-orange-400 py-3 rounded-md text-white w-6/12  "
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpComponent;
