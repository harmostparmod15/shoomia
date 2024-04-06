"use scroll";
import React from "react";

interface sneakerProp {
  brand_name: string;
  main_picture_url: string;
  name: string;
  retail_price_cents: number;
}

// REVEAL ELEMENTS ON SCROLL
const revealOnScroll = () => {
  const allSneakerCards: any = document.querySelectorAll(".sneaker");
  const allSneakerCardImages: any = document.querySelectorAll(".sneaker-image");

  allSneakerCards.forEach((card: any) => {
    card?.classList.remove("opacity-0");
    card?.classList.remove("translate-y-96");
  });

  allSneakerCardImages.forEach((img: any) => {
    img?.classList.remove("blur-xl");
  });
};

const SneakerCard = ({
  brand_name,
  main_picture_url,
  name,
  retail_price_cents,
}: sneakerProp) => {
  return (
    <div
      onLoad={revealOnScroll}
      className="sneaker  transition-all  duration-700   scale-  opacity-0 translate-y-96    rounded-md   w-[24rem]  mb-8 "
    >
      <div className="bg-gray-200  w-full ">
        <img
          className="sneaker-image blur-xl transition-all duration-[1.2s] w-72   "
          src={main_picture_url}
        ></img>
      </div>
      {/*  details */}
      <div className="font-bold ">
        <h1 className="text-gray-400 ">{brand_name}</h1>
        <h1>{name}</h1>
        <h1>${retail_price_cents / 100}</h1>
      </div>
    </div>
  );
};

export default SneakerCard;
