import React from "react";

type propType = {
  brand_name: string;
  main_picture_url: string;
  name: string;
  retail_price_cents: number;
};

const SneakerCard = ({
  brand_name,
  main_picture_url,
  name,
  retail_price_cents,
}: propType) => {
  return (
    <div className="shadow-md  shadow-[#BECCD0]  rounded-lg  border border-[#5A5E62] border-opacity-40 mx bg-[#201d1d] w-[24rem] p-4 mb-8 ">
      <div className="bg-[#5A5E62] ">
        <img className="w-72 " src={main_picture_url}></img>
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
