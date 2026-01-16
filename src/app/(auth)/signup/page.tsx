// "use client";
// import dynamic from "next/dynamic";
// import React from "react";

// const SignUpComponent = dynamic(() => import("../../components/SignUp"), {
//   ssr: false,
// });

// const SignUp = () => {
//   return <SignUpComponent />;
// };

// export default SignUp;

"use client";

import React from "react";
import SignUpComponent from "../../components/SignUp"; // relative to signup/page.tsx

const SignUpPage = () => {
  return <SignUpComponent />;
};

export default SignUpPage;
