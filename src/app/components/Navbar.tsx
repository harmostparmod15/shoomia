"use client";
import Link from "next/link";
import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import appStore from "../utils/store";
import { clearCart, toggleCartPage } from "../utils/cartSlice";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/navigation";
import { removeUser } from "../utils/userSlice";

import cartImage from "../../../public/images/shopping-bag.png";
import Image from "next/image";

type StoreObj = {
  user: string;
  cart: { items: []; showCartPage: boolean };
};

const Page = () => {
  const cartItem = useSelector((store: StoreObj) => store?.cart?.items);
  const showCart = useSelector((store: StoreObj) => store?.cart?.showCartPage);
  const userToken = useSelector((store: StoreObj) => store?.user);

  const dispatch = useDispatch();
  const router = useRouter();

  // HANDLE SHOW CART PAGE
  const handleShowCart = () => {
    dispatch(toggleCartPage(!showCart));
  };

  // HANDLE LOGOUT USER
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/");
        dispatch(removeUser());
        dispatch(clearCart());
      })
      .catch((error) => {
        // An error happened.
        alert("unable to log you out ");
      });
  };

  return (
    <div className="w-full   py-8      ">
      <div className="w-10/12 mx-auto flex justify-between">
        <Link href={"/"}>
          <h1 className="text-xl font-bold">Shoomia</h1>
        </Link>

        <ul className="flex w-4/12 justify-between opacity-80 items-baseline">
          <Link href={"/sneakers"}>
            <li>Home</li>
          </Link>

          <li>Products</li>
          <li onClick={handleShowCart} className="cursor-pointer flex ">
            Cart - {cartItem.length}
            <span>
              <Image className="w-8" alt="logo" src={cartImage}></Image>
            </span>
          </li>
          {/*  LOGOUT BTN */}
          {userToken && (
            <button
              onClick={handleLogOut}
              className="hover:text-gray-400  bg-black text-white px-4 py-2 rounded-md   border"
            >
              Log Out
            </button>
          )}
          {/* LOGIN BTN */}
          {!userToken && (
            <Link href={"/signin"}>
              <button className="hover:text-gray-400  bg-black text-white px-4 py-2 rounded-md   border">
                Log In
              </button>
            </Link>
          )}
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
