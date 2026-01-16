import React from "react";

import img from "../../../public/images/red-image.png";
import Image from "next/image";
import Link from "next/link";

const Body = () => {
  return (
    <div className=" text-black flex justify-center items-center h-screen relative  z-10">
      <div className="w-10/12 mx-auto flex justify-between  ">
        <h1 className=" absolute top-24 text-xl font-bold">Shoomia </h1>
        {/*  right side details */}
        <div className=" w-6/12">
          <h1 className="text-2xl font-bold py-8">NIKE XBA1 </h1>
          <p className="text-sm font-semibold opacity-70 leading-7">
            Shoomia is your go-to destination for premium sneakers. Browse a
            carefully curated collection of top brands and iconic styles,
            designed for everyday wear and standout moments. With a smooth
            shopping experience and secure checkout, finding your perfect pair
            has never been easier.
          </p>
          <Link href={"../sneakers/"}>
            <button className="bg-gray-500 px-8 py-3 rounded-md text-white my-20  ">
              Explore more
            </button>
          </Link>
        </div>
        {/*  left sdie image */}
        <div className="hero-image w-6/12  h z-20">
          <Image className="w-full rotate-12 " alt="logo" src={img} />
        </div>
        {/*  red bg */}
        <div className="bg-[#CE051C] w-4/12 absolute top-0 right-0 h-screen z-10 "></div>
      </div>
    </div>
  );
};

export default Body;
