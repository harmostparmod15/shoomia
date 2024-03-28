"use client";

import { useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Provider, useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import appStore from "../utils/store";
import { useRouter } from "next/navigation";

const Page = () => {
  // REFS
  const fullName = useRef();
  const email = useRef();
  const password = useRef();

  const dispatch = useDispatch();
  const router = useRouter();

  // FUNCTION TO SIGN UP USER
  const handleSignup = async () => {
    // sign up fnc
    createUserWithEmailAndPassword(
      auth,
      email?.current?.value,
      password?.current?.value
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("firebase api  succes ", user);

        dispatch(addUser(user?.accessToken));
        router.push("/checkout");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        console.log("fire api error", errorCode, errorMessage);
        // ..
      });
  };

  return (
    <div className="text-black bg-gradient-to-br from-slate-100 to-gray-200 w-full flex items-center h-screen">
      <div className="w-5/12 mx-auto py-12 shadow-lg bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-center opacity-70  ">
          Create an Account.
        </h1>
        <p className="text-center opacity-40 my-4 text-sm">
          Create an account to enjoy all servces
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="my-8 flex flex-col items-center justify-center gap-8"
        >
          <input
            ref={fullName}
            placeholder="Full Name"
            className="w-6/12 py-2  border-b-2 "
          ></input>
          <input
            type="email"
            ref={email}
            placeholder="Email Address"
            className="w-6/12 py-2  border-b-2 "
          ></input>
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-6/12 py-2  border-b-2 "
          ></input>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-6/12 py-2  border-b-2 "
          ></input>

          <button
            onClick={handleSignup}
            className="mt-4 bg-black py-3 rounded-md text-white w-6/12  "
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

const SignUpComponent = () => {
  return (
    <Provider store={appStore}>
      <Page />
    </Provider>
  );
};

export default SignUpComponent;
