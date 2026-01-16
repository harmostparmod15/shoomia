// // "use client";

// // import { useRef } from "react";
// // import { createUserWithEmailAndPassword } from "firebase/auth";
// // import { auth } from "../utils/firebase";
// // import { Provider, useDispatch } from "react-redux";
// // import { addUser } from "../utils/userSlice";
// // import appStore from "../utils/store";
// // import { useRouter } from "next/navigation";
// // import Link from "next/link";
// // import toast from "react-hot-toast";

// // const Page = () => {
// //   // REFS
// //   const fullName = useRef<any>(null);
// //   const email = useRef<any>(null);
// //   const password = useRef<any>(null);

// //   const dispatch = useDispatch();
// //   const router = useRouter();

// //   // FUNCTION TO SIGN UP USER
// //   const handleSignup = async () => {
// //     if (!/\S+@\S+\.\S+/.test(email?.current?.value)) {
// //       alert("wrong email");
// //       return;
// //     }
// //     // sign up fnc
// //     else {
// //       createUserWithEmailAndPassword(
// //         auth,
// //         email?.current?.value,
// //         password?.current?.value
// //       )
// //         .then((userCredential) => {
// //           // Signed up
// //           const user: any = userCredential.user;
// //           dispatch(addUser(user?.accessToken));
// //           router.push("/checkout");
// //         })
// //         .catch((error) => {
// //           const errorCode = error.code;
// //           const errorMessage = error.message;
// //           alert(errorMessage);
// //         });
// //     }
// //   };

// //   return (
// //     <div className="text-black bg-gradient-to-br from-slate-100 to-gray-200 w-full flex items-center h-screen">
// //       <div className="w-5/12 mx-auto py-12 shadow-lg bg-white rounded-lg">
// //         <h1 className="text-3xl font-bold text-center opacity-70  ">
// //           Create an Account.
// //         </h1>
// //         <p className="text-center opacity-40 my-4 text-sm">
// //           Create an account to enjoy all servces
// //         </p>
// //         <form
// //           onSubmit={(e) => e.preventDefault()}
// //           className="my-8 flex flex-col items-center justify-center gap-8"
// //         >
// //           <input
// //             ref={fullName}
// //             placeholder="Full Name"
// //             className="w-6/12 py-2  border-b-2 "
// //           ></input>
// //           <input
// //             type="email"
// //             ref={email}
// //             placeholder="Email Address"
// //             className="w-6/12 py-2  border-b-2 "
// //           ></input>
// //           <input
// //             ref={password}
// //             type="password"
// //             placeholder="Password"
// //             className="w-6/12 py-2  border-b-2 "
// //           ></input>
// //           <input
// //             type="password"
// //             placeholder="Confirm Password"
// //             className="w-6/12 py-2  border-b-2 "
// //           ></input>

// //           <button
// //             onClick={handleSignup}
// //             className="hover:opacity-80 mt-4 bg-black py-3 rounded-md text-white w-5/12  "
// //           >
// //             Sign Up
// //           </button>

// //           <p>
// //             already a user?{" "}
// //             <span className="text-blue-800 underline transition-all duration-300 hover:text-black ">
// //               <Link href={"/signin"}>login</Link>
// //             </span>{" "}
// //           </p>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // const SignUpComponent = () => {
// //   return (
// //     <Provider store={appStore}>
// //       <Page />
// //     </Provider>
// //   );
// // };

// // export default SignUpComponent;

// "use client";

// import { useRef, useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../utils/firebase";
// import { Provider, useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import appStore from "../utils/store";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import toast from "react-hot-toast";

// const Page = () => {
//   const fullName = useRef<any>(null);
//   const email = useRef<any>(null);
//   const password = useRef<any>(null);
//   const confirmPassword = useRef<any>(null);

//   const dispatch = useDispatch();
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);

//   const handleSignup = async () => {
//     const emailValue = email?.current?.value;
//     const passwordValue = password?.current?.value;
//     const confirmPasswordValue = confirmPassword?.current?.value;

//     // Basic validation
//     if (!/\S+@\S+\.\S+/.test(emailValue)) {
//       toast.error("Please enter a valid email address");
//       return;
//     }

//     if (passwordValue !== confirmPasswordValue) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     if (passwordValue.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return;
//     }

//     try {
//       setLoading(true);
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         emailValue,
//         passwordValue
//       );

//       const user: any = userCredential.user;
//       dispatch(addUser(user?.accessToken));

//       toast.success("Account created successfully!");
//       router.push("/checkout");
//     } catch (error: any) {
//       // Firebase-friendly error messages
//       let message = "Something went wrong. Please try again.";

//       if (error.code === "auth/email-already-in-use") {
//         message = "This email is already registered";
//       } else if (error.code === "auth/weak-password") {
//         message = "Password is too weak";
//       }

//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="text-black bg-gradient-to-br from-slate-100 to-gray-200 w-full flex items-center h-screen">
//       <div className="w-5/12 mx-auto py-12 shadow-lg bg-white rounded-lg">
//         <h1 className="text-3xl font-bold text-center opacity-70">
//           Create an Account.
//         </h1>
//         <p className="text-center opacity-40 my-4 text-sm">
//           Create an account to enjoy all services
//         </p>
//         <form
//           onSubmit={(e) => e.preventDefault()}
//           className="my-8 flex flex-col items-center justify-center gap-8"
//         >
//           <input
//             ref={fullName}
//             placeholder="Full Name"
//             className="w-6/12 py-2 border-b-2"
//           />
//           <input
//             type="email"
//             ref={email}
//             placeholder="Email Address"
//             className="w-6/12 py-2 border-b-2"
//           />
//           <input
//             ref={password}
//             type="password"
//             placeholder="Password"
//             className="w-6/12 py-2 border-b-2"
//           />
//           <input
//             ref={confirmPassword}
//             type="password"
//             placeholder="Confirm Password"
//             className="w-6/12 py-2 border-b-2"
//           />

//           <button
//             onClick={handleSignup}
//             disabled={loading}
//             className={`mt-4 bg-black py-3 rounded-md text-white w-5/12 hover:opacity-80 ${
//               loading ? "opacity-60 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? "Creating account..." : "Sign Up"}
//           </button>

//           <p>
//             Already a user?{" "}
//             <span className="text-blue-800 underline transition-all duration-300 hover:text-black">
//               <Link href={"/signin"}>Login</Link>
//             </span>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// const SignUpComponent = () => {
//   return (
//     <Provider store={appStore}>
//       <Page />
//     </Provider>
//   );
// };

// export default SignUpComponent;

"use client";

import { useRef, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/navigation";
import { addUser } from "../utils/userSlice";
import { Provider, useDispatch } from "react-redux";
import appStore from "../utils/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import Link from "next/link";
import toast from "react-hot-toast";

const persistor = persistStore(appStore);

const SignUpPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const fullName = useRef<any>(null);
  const email = useRef<any>(null);
  const password = useRef<any>(null);
  const confirmPassword = useRef<any>(null);

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!auth) {
      toast.error("Authentication not ready. Please try again.");
      return;
    }

    const emailValue = email?.current?.value;
    const passwordValue = password?.current?.value;
    const confirmPasswordValue = confirmPassword?.current?.value;

    if (!/\S+@\S+\.\S+/.test(emailValue)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (passwordValue !== confirmPasswordValue) {
      toast.error("Passwords do not match");
      return;
    }

    if (passwordValue.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue
      );
      const user: any = userCredential.user;
      dispatch(addUser(user?.accessToken));

      toast.success("Account created successfully!");
      router.push("/checkout"); // or "/sneakers" if you prefer
    } catch (error: any) {
      let message = "Something went wrong. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        message = "This email is already registered";
      } else if (error.code === "auth/weak-password") {
        message = "Password is too weak";
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black bg-gradient-to-br from-slate-100 to-gray-200 w-full flex items-center h-screen">
      <div className="w-5/12 mx-auto py-12 shadow-lg bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-center opacity-70">
          Create an Account
        </h1>
        <p className="text-center opacity-40 my-4 text-sm">
          Create an account to enjoy all services
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="my-8 flex flex-col items-center justify-center gap-8"
        >
          <input
            ref={fullName}
            placeholder="Full Name"
            className="w-6/12 py-2 border-b-2"
          />
          <input
            type="email"
            ref={email}
            placeholder="Email Address"
            className="w-6/12 py-2 border-b-2"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-6/12 py-2 border-b-2"
          />
          <input
            ref={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            className="w-6/12 py-2 border-b-2"
          />

          <button
            type="button"
            onClick={handleSignUp}
            disabled={loading}
            className={`mt-4 bg-black py-3 rounded-md text-white w-5/12 hover:opacity-80 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p>
            Already a user?{" "}
            <span className="text-blue-800 underline hover:text-black">
              <Link href="/signin">Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

const SignUpComponent = () => (
  <Provider store={appStore}>
    <PersistGate persistor={persistor}>
      <SignUpPage />
    </PersistGate>
  </Provider>
);

export default SignUpComponent;
