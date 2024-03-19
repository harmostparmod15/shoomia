import React from "react";
import SneakerCard from "./SneakerCard";
import Link from "next/link";

import axios from "axios";

const SneakerRecommendation = async () => {
  // API CALL
  const getRecommendedSneakers = async () => {
    const data = await axios.get(
      "http://localhost:3000/api/v1/sneaker/recommended"
    );
    return data?.data?.data;
  };

  const sneakers = await getRecommendedSneakers();

  return (
    <div className="w-10/12 mx-auto ">
      <h1 className="text-4xl font-bold ">You may also like</h1>
      {/*  SNEAKERS CARD */}
      <div className="py-4 w-full  gap-8   flex  overflow-x-scroll">
        {sneakers.map((sneaker: any) => (
          <Link href={"/sneaker/" + sneaker?.id} key={sneaker?.id}>
            <SneakerCard
              main_picture_url={sneaker?.main_picture_url}
              brand_name={sneaker?.brand_name}
              name={sneaker?.name}
              retail_price_cents={sneaker?.retail_price_cents}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SneakerRecommendation;
