import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full   py-8      ">
      <div className="w-10/12 mx-auto flex justify-between">
        <Link href={"/"}>
          <h1 className="text-xl font-bold">Shoomia</h1>
        </Link>
        <ul className="flex w-4/12 justify-between opacity-80">
          <li>Home</li>
          <li>Products</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
