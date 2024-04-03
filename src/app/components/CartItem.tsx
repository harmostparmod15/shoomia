import React from "react";

interface propType {
  original_picture_url: string;
  name: string;
  brand_name: string;
  retail_price_cents: number;
  userShoeSize: number;
}

const CartItem = ({
  original_picture_url,
  name,
  brand_name,
  retail_price_cents,
  userShoeSize,
}: propType) => {
  return (
    <div className="w-10/12 mx-auto  flex border-b-2">
      {/*  IMG */}
      <img
        className="w-36 h-32 bg-slate-100 m-4"
        src={original_picture_url}
      ></img>
      {/*  DETAILS */}
      <div className="m-4">
        <h1 className="text-gray-400 ">{brand_name}</h1>
        <h1 className="font-bold text-sm ">{name}</h1>
        <h1 className="text-gray-400 ">Shoe Size (UK): {userShoeSize}</h1>
        {/*  PRICE / QUANTITY */}
        <div className="flex justify-between py-4 ">
          <h1 className="font-bold ">${retail_price_cents / 100}</h1>
          {/* <h1 className="w-6/12 text-center  border border-black"> + 1 -</h1> */}
        </div>
      </div>
      {/*  CROSS BTN */}
      <svg
        className="m-4"
        width="24"
        height="24"
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
  );
};

export default CartItem;
