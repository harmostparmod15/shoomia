"use client";

import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SneakerCard from "../components/SneakerCard";
import { json } from "stream/consumers";

const page = () => {
  const [sneakerList, setSneakerList] = useState<any[]>([]);

  // api call
  const getSneakers = async () => {
    const data = await fetch("http://localhost:3000/api/v1/sneakers");
    const json = await data.json();
    console.log("sneaker list", json?.data?.sneakers);
    setSneakerList(json?.data?.sneakers);
  };

  useEffect(() => {
    getSneakers();
  }, []);

  return (
    <div className="  ">
      <Navbar />
      {/*  SNEAKER CONTAINER */}
      <div className="py-24  h-20 w-10/12 mx-auto  flex flex-wrap justify-between ">
        {sneakerList.map((sneaker) => (
          <SneakerCard
            key={sneaker?.id}
            main_picture_url={sneaker?.main_picture_url}
            brand_name={sneaker?.brand_name}
            name={sneaker?.name}
            retail_price_cents={sneaker?.retail_price_cents}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
