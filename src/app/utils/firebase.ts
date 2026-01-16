// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCpj_2GjjS_dqiUsUJkj8Fz6T3Si4l13rE",
//   authDomain: "shoomia-da43f.firebaseapp.com",
//   projectId: "shoomia-da43f",
//   storageBucket: "shoomia-da43f.appspot.com",
//   messagingSenderId: "577222567843",
//   appId: "1:577222567843:web:a8be39f88dd081bfc49c16",
//   measurementId: "G-P9HS1SP0QG",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export const auth = getAuth();

// src/utils/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "...",
};

let app;
let auth: Auth | null = null;
let analytics;

if (typeof window !== "undefined") {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  analytics = getAnalytics(app);
}

export { app, auth, analytics };
