"use client";
import React, { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import appStore from "../utils/store";
import { useRouter } from "next/navigation";
import CartItem from "../components/CartItem";
import Link from "next/link";

type StoreObj = {
  user: string;
  cart: { items: []; showCartPage: boolean };
};

const Page = () => {
  const router = useRouter();

  const [totalPrice, setTotalPrice] = useState(0);

  const cartItems: any = useSelector((store: StoreObj) => store?.cart?.items);
  const userToken = useSelector((store: StoreObj) => store?.user);

  useEffect(() => {
    if (!userToken) {
      router.push("/sneakers");
    }
  }, []);

  // COUNT TOTAL PRICE
  const priceCalculate = () => {
    let price = 0;
    cartItems?.map((item: any) => (price += item.retail_price_cents / 100));
    setTotalPrice(price);
  };

  useEffect(() => {
    priceCalculate();
  }, []);

  return (
    <div className="w-screen bg-[#f2f2f2] relative ">
      <Link href={"/sneakers"}>
        <h1 className="text-2xl w-9/12 mx-auto  left-[10%]  font-bold  pt-12 absolute  top-0">
          Home
        </h1>
      </Link>

      <h1 className="text-5xl font-bold text-center py-12 ">CHECKOUT</h1>
      {/*  CONTAINER */}
      <div className=" w-10/12 mx-auto flex justify-between h-screen">
        {/*  LEFT SIDE SHIPPING ADDRESS */}
        <div className="relative  w-6/12 h-5/6 bg-[#F8F8F8] flex flex-col gap-8">
          {/*  PAYMENT FORM */}
          <div>
            <h1 className="w-10/12 mx-auto text-2xl font-bold py-4">Payment</h1>
            {/*  SHIPPING ADDRESS FORM */}
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-4">
                <input
                  className="py-2 px-4 w-10/12 mx-auto"
                  type="text"
                  placeholder="Name on Card"
                ></input>
                <input
                  className="py-2 px-4 w-10/12 mx-auto"
                  type="text"
                  placeholder="Card Number"
                ></input>
                {/*  COUNTRY & STATE */}
                <div className="w-10/12 mx-auto gap-4  flex justify-between">
                  <input
                    className="py-2 px-4 w-6/12"
                    type="text"
                    placeholder="Exp Month "
                  ></input>
                  <input
                    className="py-2 px-4 w-6/12"
                    type="text"
                    placeholder="Exp Year"
                  ></input>
                  <input
                    className="py-2 px-4 w-6/12"
                    type="text"
                    placeholder="CVC CODE"
                  ></input>
                </div>
              </div>
            </form>
          </div>
          {/*  BILLING FORM */}
          <div>
            <h1 className="w-10/12 mx-auto text-2xl font-bold py-4">Billing</h1>
            {/*  SHIPPING ADDRESS FORM */}
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-4">
                {/*  FULL NAME */}
                <div className="w-10/12 mx-auto gap-4  flex justify-between">
                  <input
                    className="py-2 px-4 w-6/12"
                    type="text"
                    placeholder="First Name"
                  ></input>
                  <input
                    className="py-2 px-4 w-6/12"
                    type="text"
                    placeholder="Last Name"
                  ></input>
                </div>

                <input
                  className="py-2 px-4 w-10/12 mx-auto"
                  type="text"
                  placeholder="Address"
                ></input>
                <input
                  className="py-2 px-4 w-10/12 mx-auto"
                  type="text"
                  placeholder="City"
                ></input>
                {/*  COUNTRY & STATE */}
                <div className="w-10/12 mx-auto gap-4  flex justify-between">
                  <input
                    className="py-2 px-4 w-6/12"
                    type="text"
                    placeholder="Country "
                  ></input>
                  <input
                    className="py-2 px-4 w-6/12"
                    type="text"
                    placeholder="State/Province"
                  ></input>
                </div>

                {/*  PINCODE & PHOE NUM */}
                <div className="w-10/12 mx-auto gap-4  flex justify-between">
                  <input
                    className="py-2 px-4 w-6/12"
                    type="text"
                    placeholder="Zip/Postal "
                  ></input>
                  <input
                    className="py-2 px-4 w-6/12"
                    type="text"
                    placeholder="Phone Number"
                  ></input>
                </div>
              </div>
            </form>
          </div>

          {/*  CONTINUE BUTTON */}
          <button className="bg-black text-white w-full py-4 font-bold pt-4 absolute left-0  bottom-0 ">
            SAVE & CONTINUE
          </button>
        </div>

        {/*  RIGHT SIDE CART ITEM */}
        <div className=" w-5/12 h-5/6    overflow-y-hidden bg-[#bfbfbf] bg-opacity-10">
          {/*  TOTAL PRICE SECTION */}
          <div className="w-10/12 mx-auto p-4">
            <h1 className="font-bold text-lg py-2">Payment</h1>
            <div className=" flex flex-col gap-1">
              <div className="opacity-60 font-semibold  flex justify-between ">
                <h1>Subtotal </h1>
                <h1>${totalPrice}</h1>
              </div>
              <div className="opacity-60 font-semibold  flex justify-between ">
                <h1>Estimated Shipping </h1>
                <h1>$0</h1>
              </div>

              <div className="opacity-60 font-semibold  flex justify-between ">
                <h1>Estimated Tax </h1>
                <h1>$0</h1>
              </div>
            </div>
            <div className=" flex justify-between py-4">
              <h1 className="font-bold text-lg ">Total </h1>
              <h1 className="font-bold text-lg  ">${totalPrice}</h1>
            </div>
          </div>

          {/*  CART ITEMS SECTION */}
          <div>
            <h1 className="font-bold w-10/12 mx-auto p-4  ">In Your Cart</h1>
            <div className="overflow-y-scroll h-96 pb-20  ">
              <div>
                {cartItems.map((item: any) => (
                  <CartItem {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  return (
    <Provider store={appStore}>
      <Page />
    </Provider>
  );
};

export default Checkout;
