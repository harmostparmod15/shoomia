"use client";
import React from "react";
import CartItem from "../components/CartItem";
import { Provider, useSelector } from "react-redux";
import appStore from "../utils/store";

const Page = () => {
  const cart = useSelector((store) => store?.cart);
  console.log("cart", cart);

  console.log("prop", cart?.items[0]);

  return (
    <div className="bg-white h-screen w-4/12 absolute right-0 ">
      {/* CART HEADER */}
      <div className="flex text-4xl font-bold w-10/12 mx-auto justify-around p-12 border-b-2  ">
        <h1> Shopping Cart</h1>
        <h1>❌</h1>
      </div>

      {/*  CART ITEMS */}
      {cart?.items.map((item: any) => (
        <CartItem {...item} />
      ))}
    </div>
  );
};

const Layout = () => {
  return (
    <Provider store={appStore}>
      <Page />
    </Provider>
  );
};

export default Layout;
