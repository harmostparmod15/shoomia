import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between border border-red-500 px-8 py-4 bg-white text-black font-bold text-xl">
      <h1>Shoomia</h1>
      <ul className="flex w-4/12 justify-between">
        <li>Home</li>
        <li>Products</li>
        <li>Cart</li>
      </ul>
    </div>
  );
};

export default Navbar;
