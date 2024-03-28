"use client";
import dynamic from "next/dynamic";
import React from "react";

const SignUpComponent = dynamic(() => import("../../components/SignUp"), {
  ssr: false,
});

const SignUp = () => {
  return <SignUpComponent />;
};

export default SignUp;
