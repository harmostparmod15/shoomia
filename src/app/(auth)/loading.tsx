import React from "react";
import Loader from "@/app/components/Loader";

const loadingPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default loadingPage;
