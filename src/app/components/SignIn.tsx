// "use client";

// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useRef, useState } from "react";
// import { auth } from "../utils/firebase";
// import { useRouter } from "next/navigation";
// import { addUser } from "../utils/userSlice";
// import { Provider, useDispatch } from "react-redux";
// import appStore from "../utils/store";
// import { PersistGate } from "redux-persist/integration/react";
// import persistStore from "redux-persist/es/persistStore";
// import Link from "next/link";
// import toast from "react-hot-toast";

// const persistor = persistStore(appStore);

// const SignInPage = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const email = useRef<any>("test@example.com");
//   const password = useRef<any>("12345678");
//   const [loading, setLoading] = useState(false);

//   const handleSignIn = async () => {
//     const emailValue = email.current?.value;
//     const passwordValue = password.current?.value;

//     // Basic validation
//     if (!/\S+@\S+\.\S+/.test(emailValue)) {
//       toast.error("Please enter a valid email address");
//       return;
//     }

//     if (!passwordValue || passwordValue.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return;
//     }

//     try {
//       setLoading(true);
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         emailValue,
//         passwordValue
//       );

//       const user: any = userCredential.user;
//       dispatch(addUser(user?.accessToken));

//       toast.success("Signed in successfully!");
//       router.push("/sneakers");
//     } catch (error: any) {
//       let message = "Something went wrong. Please try again.";

//       // Firebase / Backend specific messages
//       if (error.code === "auth/user-not-found") {
//         message = "No account found with this email";
//       } else if (error.code === "auth/wrong-password") {
//         message = "Incorrect password";
//       } else if (error.code === "auth/too-many-requests") {
//         message = "Too many attempts. Try again later";
//       } else if (error.message) {
//         // Use error.message if exists
//         message = error.message;
//       } else if (error.error?.message) {
//         // Check structured backend error
//         message = error.error.message;
//       }

//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="text-black bg-gradient-to-br from-slate-100 to-gray-200 w-full flex items-center h-screen">
//       <div className="w-5/12 mx-auto py-12 shadow-lg bg-white rounded-lg">
//         <h1 className="text-3xl font-bold text-center">Sign In</h1>
//         <form
//           onSubmit={(e) => e.preventDefault()}
//           className="my-8 flex flex-col items-center justify-center gap-8"
//         >
//           <input
//             type="email"
//             ref={email}
//             placeholder="Email Address"
//             className="w-6/12 py-2 border-b-2"
//           />
//           <input
//             type="password"
//             ref={password}
//             placeholder="Password"
//             className="w-6/12 py-2 border-b-2"
//           />

//           <button
//             type="button"
//             onClick={handleSignIn}
//             disabled={loading}
//             className={`mt-4 bg-black py-3 rounded-md text-white w-6/12 hover:opacity-80 ${
//               loading ? "opacity-60 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>

//           <p>
//             Don't have an account?{" "}
//             <span className="text-blue-800 underline hover:text-black">
//               <Link href="/signup">Register here</Link>
//             </span>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// const SignInComponent = () => (
//   <Provider store={appStore}>
//     <PersistGate persistor={persistor}>
//       <SignInPage />
//     </PersistGate>
//   </Provider>
// );

// export default SignInComponent;

"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
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

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Pre-filled dummy credentials
  const email = useRef<any>("test@example.com");
  const password = useRef<any>("12345678");

  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!auth) {
      toast.error("Authentication not ready. Please try again.");
      return;
    }
    const emailValue = email.current.value ?? email.current;
    const passwordValue = password.current.value ?? password.current;

    if (!/\S+@\S+\.\S+/.test(emailValue)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!passwordValue || passwordValue.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue
      );

      const user: any = userCredential.user;
      dispatch(addUser(user?.accessToken));

      toast.success("Signed in successfully!");
      router.push("/sneakers");
    } catch (error: any) {
      let message = error?.message ?? "Something went wrong. Try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black bg-gradient-to-br from-slate-100 to-gray-200 w-full flex items-center h-screen">
      <div className="w-5/12 mx-auto py-12 shadow-lg bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-center">Sign In</h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="my-8 flex flex-col items-center justify-center gap-8"
        >
          <input
            type="email"
            ref={email}
            defaultValue={email.current} // pre-fill dummy email
            placeholder="Email Address"
            className="w-6/12 py-2 border-b-2"
          />
          <input
            type="password"
            ref={password}
            defaultValue={password.current} // pre-fill dummy password
            placeholder="Password"
            className="w-6/12 py-2 border-b-2"
          />

          <button
            onClick={handleSignIn}
            disabled={loading}
            className={`mt-4 bg-black py-3 rounded-md text-white w-6/12 hover:opacity-80 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="mt-2 text-sm">
            New here?{" "}
            <Link
              href="/signup"
              className="text-blue-800 underline hover:text-black"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const SignInComponent = () => (
  <Provider store={appStore}>
    <PersistGate persistor={persistor}>
      <Page />
    </PersistGate>
  </Provider>
);

export default SignInComponent;
