"use client";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { Provider, useDispatch, useSelector } from "react-redux";
import appStore from "../utils/store";
import { toggleCartPage } from "../utils/cartSlice";
import { useRouter } from "next/navigation";

type StoreObj = {
  user: string;
  cart: { items: []; showCartPage: boolean };
};

const Page = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const cart = useSelector((store: StoreObj) => store?.cart);
  const userToken = useSelector((store: StoreObj) => store?.user);

  const dispatch = useDispatch();
  const router = useRouter();

  // HIDE CART PAGE
  const hideCartPage = () => {
    dispatch(toggleCartPage(false));
  };

  // COUNT TOTAL PRICE
  const priceCalculate = () => {
    let price = 0;
    cart?.items?.map((item: any) => (price += item.retail_price_cents / 100));
    setTotalPrice(price);
  };

  useEffect(() => {
    priceCalculate();
  });

  // HANDLE CHECKOUT
  const handleCheckOut = () => {
    if (!userToken) {
      alert("sign up first");
      router.push("/signup");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div className="cart-page scale-1 transition-all duration-1000  bg-white  z-20  w-4/12 absolute right-0 top-0 flex flex-col h-screen ">
      {/* CART HEADER */}
      <div className="flex text-2xl font-bold w-full mx-auto justify-between  p-12 border-b-2  ">
        <h1> Shopping Cart</h1>

        <svg
          onClick={hideCartPage}
          className="cursor-pointer  "
          width="28"
          height="28"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="1.50136"
            y1="14.5844"
            x2="15.0844"
            y2="1.00135"
            stroke="black"
            stroke-width="2"
          />
          <line
            x1="1.70711"
            y1="1.29289"
            x2="15.2902"
            y2="14.876"
            stroke="black"
            stroke-width="2"
          />
        </svg>
      </div>

      {/*  CART ITEMS */}
      <div className="overflow-y-scroll overflow-x-hidden pb-32">
        {cart?.items.map((item: any) => (
          <CartItem {...item} />
        ))}
      </div>

      {/*  CHECKOUT BTN */}
      <div className=" bottom-0 bg-white text-black absolute flex flex-col gap-4  w-full mx-auto pb-12 px-12 pt-2">
        <div className="text-xl font-bold  flex justify-between ">
          <h1>Subtotal</h1>
          <h1>${totalPrice}</h1>
        </div>
        <button
          onClick={handleCheckOut}
          className="hover:opacity-60 transition-all duration-300   bg-black text-white py-2 "
        >
          CHECKOUT
        </button>
      </div>
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
