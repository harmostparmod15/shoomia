"use client";
import React from "react";
import CartItem from "./CartItem";
import { Provider, useDispatch, useSelector } from "react-redux";
import appStore from "../utils/store";
import { toggleCartPage } from "../utils/cartSlice";

const Page = () => {
  const cart = useSelector((store) => store?.cart);

  console.log("prop", cart?.items[0]);

  const dispatch = useDispatch();

  // HIDE CART PAGE
  const hideCartPage = () => {
    dispatch(toggleCartPage(false));
  };

  return (
    <div className="cart-page scale-1 transition-all duration-1000  bg-white  z-20  w-4/12 absolute right-0 top-0 flex flex-col h-screen overflow-y-scroll overflow-x-hidden ">
      {/* CART HEADER */}
      <div className="flex text-4xl font-bold w-10/12 mx-auto justify-around p-12 border-b-2  ">
        <h1> Shopping Cart</h1>
        <h1 className="cursor-pointer " onClick={hideCartPage}>
          ❌
        </h1>
      </div>

      {/*  CART ITEMS */}
      {cart?.items.map((item: any) => (
        <CartItem {...item} />
      ))}
    </div>
  );
};

const Cart = () => {
  return (
    <Provider store={appStore}>
      <Page />
    </Provider>
  );
};

export default Cart;
