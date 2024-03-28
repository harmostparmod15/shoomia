"use client";
import dynamic from "next/dynamic";
import React from "react";

const SignInComponent = dynamic(() => import("../../components/SignIn"), {
  ssr: false,
});

const SignIn = () => {
  return <SignInComponent />;
};

export default SignIn;
