"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef } from "react";
import { auth } from "../utils/firebase";
import { useRouter } from "next/navigation";
import { addUser } from "../utils/userSlice";
import { Provider, useDispatch } from "react-redux";
import appStore from "../utils/store";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // REFS
  const email = useRef<any>(null);
  const password = useRef<any>(null);

  // FUNCTION TO SIGN IN USER
  const handleSignIn = async () => {
    if (!/\S+@\S+\.\S+/.test(email?.current?.value)) {
      alert("wrong email");
      return;
    }
    // sign up fnc
    else {
      signInWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          // Signed up
          const user: any = userCredential.user;
          dispatch(addUser(user?.accessToken));
          router.push("/sneakers");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    }
  };

  return (
    <div className="text-black bg-gradient-to-br from-slate-100 to-gray-200 w-full flex items-center h-screen">
      <div className="w-5/12 mx-auto py-12 shadow-lg bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-center  ">Sign In.</h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="my-8 flex flex-col items-center justify-center gap-8"
        >
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
          <button
            onClick={handleSignIn}
            className="mt-4 bg-black py-3 rounded-md text-white w-6/12  "
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

const SignInComponent = () => {
  return (
    <Provider store={appStore}>
      <Page />
    </Provider>
  );
};

export default SignInComponent;
