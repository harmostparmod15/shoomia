"use client";
import Link from "next/link";
import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import appStore from "../utils/store";
import { toggleCartPage } from "../utils/cartSlice";

const Page = () => {
  const cartItem = useSelector((store) => store?.cart?.items);
  const showCart = useSelector((store) => store?.cart?.showCartPage);

  const dispatch = useDispatch();

  // HANDLE SHOW CART PAGE
  const handleShowCart = () => {
    dispatch(toggleCartPage(!showCart));
  };

  return (
    <div className="w-full   py-8      ">
      <div className="w-10/12 mx-auto flex justify-between">
        <Link href={"/"}>
          <h1 className="text-xl font-bold">Shoomia</h1>
        </Link>
        <ul className="flex w-4/12 justify-between opacity-80">
          <Link href={"/sneakers"}>
            <li>Home</li>
          </Link>

          <li>Products</li>
          <li onClick={handleShowCart} className="cursor-pointer ">
            Cart - {cartItem.length}
          </li>
        </ul>
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <Provider store={appStore}>
      <Page />
    </Provider>
  );
};
export default Navbar;
