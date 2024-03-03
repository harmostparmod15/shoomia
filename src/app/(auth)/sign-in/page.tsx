import React from "react";

const page = () => {
  return (
    <div className="text-black bg-gradient-to-br from-slate-100 to-gray-200 w-full flex items-center h-screen">
      <div className="w-5/12 mx-auto py-12 shadow-lg bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-center  ">Sign In.</h1>
        <form className="my-8 flex flex-col items-center justify-center gap-8">
          <input
            placeholder="Email Address"
            className="w-6/12 py-2  border-b-2 "
          ></input>
          <input
            placeholder="Password"
            className="w-6/12 py-2  border-b-2 "
          ></input>

          <button className="mt-4 bg-orange-400 py-3 rounded-md text-white w-6/12  ">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
