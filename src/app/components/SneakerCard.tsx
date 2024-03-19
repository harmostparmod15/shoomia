import React from "react";

interface sneakerProp {
  brand_name: string;
  main_picture_url: string;
  name: string;
  retail_price_cents: number;
}

const SneakerCard = ({
  brand_name,
  main_picture_url,
  name,
  retail_price_cents,
}: sneakerProp) => {
  return (
    <div className="    rounded-md   w-[24rem] -4 mb-8 ">
      <div className="bg-gray-200  w-full ">
        <img
          className="w-72 hover:-rotate-45 transition-all duration-500 "
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
