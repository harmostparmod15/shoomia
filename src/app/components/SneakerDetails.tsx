"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, toggleCartPage } from "../utils/cartSlice";
import { useRouter } from "next/navigation";
import router from "next/router";
import Error from "./Error";
import Cart from "./Cart";

interface sneakerDetailsProps {
  original_picture_url: string;
  brand_name: string;
  name: string;
  retail_price_cents: number;
  size_range: number[];
  story_html: string;
  release_year: number;
  designer: string;
  upper_material: string;
}

//  SHOE SIZE BOXES COMPONENT
const ShoeSize = ({
  size,
  index,
  setUserShoeSize,
}: {
  size: number;
  index: number;
  setUserShoeSize: () => void;
}) => {
  // handle user size
  const handleUserSize = (index: number) => {
    setUserShoeSize();
    const sizeboxes = Array.from(document.querySelectorAll(".size"));
    sizeboxes.forEach((box, i) =>
      index === i
        ? box.classList.add("bg-black", "text-white")
        : box.classList.remove("bg-black", "text-white")
    );
  };
  return (
    <div
      onClick={() => handleUserSize(index)}
      className="size hover:cursor-pointer  transition-all duration-300     border border-black  w-24  text-center  py-2 "
    >
      {size}
    </div>
  );
};

const SneakerDetails = ({
  original_picture_url,
  brand_name,
  name,
  retail_price_cents,
  size_range,
  story_html,
  release_year,
  designer,
  upper_material,
}: sneakerDetailsProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // selector
  const showCart = useSelector((store) => store?.cart?.showCartPage);

  // STATES
  const [userShoeSize, setUserShoeSize] = useState(0);
  const [showErrorPage, setShowErrorPage] = useState(false);
  const [showCartPage, setShowCartPage] = useState(false);

  //   REMOVING P TAG FROM PRODUCT DETAILS
  if (story_html) story_html = story_html.replace(/(<([^>]+)>)/gi, "");

  // EXTRACTING SIZE FROM 6 TO 10
  size_range = size_range.filter((size) => size < 10 && size > 6).sort();

  // ADD ITEM TO CART ACTION
  const addItemtToCart = () => {
    console.log("fn clicked");
    console.log("user shoe size", userShoeSize);
    try {
      if (userShoeSize === 0) {
        console.log("error");
        setShowErrorPage(true);
      } else {
        dispatch(
          addItem({
            original_picture_url,
            brand_name,
            name,
            retail_price_cents,
            userShoeSize,
          })
        );
        dispatch(toggleCartPage(true));
      }
    } catch (error) {}
  };

  return (
    <div className="relative">
      {/*  SNEAKER DETAIL */}
      <div
        className={
          "relative w-10/12 mx-auto flex justify-between  " +
          (showCartPage && "grayscale ")
        }
      >
        {showErrorPage && (
          <Error
            setShowErroPage={() => setShowErrorPage(false)}
            appName="please select shoe size"
          />
        )}
        {/*  right side sneaker image */}
        <div className="w-7/12 bg-slate-200 my-12 ">
          <img className="w-full " src={original_picture_url}></img>
        </div>

        {/*  left side sneaker detials */}
        <div className="w-5/12 border my-12 p-12">
          <h1 className="text-gray-400 text-xl font-bold ">{brand_name}</h1>
          <h1 className="py-4 text-4xl font-bold ">{name}</h1>
          <h1 className="text-xl font-bold">${retail_price_cents / 100}</h1>
          {/*  SHOE SIZE */}
          <div className="">
            <h1 className="text-xl font-bold opacity-80 ">Shoe Size UK</h1>
            {/*  SIZE BOXES */}
            <div className="flex gap-2 flex-wrap my-4 ">
              {size_range.map((size, i) => (
                <ShoeSize
                  size={size}
                  index={i}
                  key={size}
                  setUserShoeSize={() => setUserShoeSize(size)}
                />
              ))}
            </div>
          </div>

          {/*  ADD TO CART */}
          <button
            onClick={addItemtToCart}
            className="w-10/12 mx-auto bg-black text-white py-4 px-4  "
          >
            Add to cart
          </button>
          {/* ACCORDIONS  */}
          <div className=" my-4 flex flex-col gap-4 ">
            {/*  ABOUT PRODUCT */}
            {story_html && (
              <div>
                <h1 className="text-xl font-bold py-4">ABOUT PRODUCT</h1>
                <p className="  leading-8 text-xl ">{story_html}</p>
              </div>
            )}

            {/* PRODUCT DETAILS */}
            <div>
              <h1 className="text-xl font-bold py-4">PRODUCT DETAILS</h1>
              <h1>
                <span className="text-lg font-bold opacity-70 ">
                  Release year :
                </span>{" "}
                {release_year}
              </h1>
              <h1>
                <span className="text-lg font-bold opacity-70 ">
                  {" "}
                  Designer :{" "}
                </span>
                {designer}
              </h1>
              <h1>
                <span className="text-lg font-bold opacity-70 ">
                  {" "}
                  Upper material :{" "}
                </span>

                {upper_material}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/*  CART PAGE */}
      {showCart && <Cart />}

      {/*  GRAY OVERLAY */}
      {showCart && (
        <div className="z-10 absolute top-0 left-0 bg-black bg-opacity-50 h-screen w-screen  "></div>
      )}
    </div>
  );
};

export default SneakerDetails;
