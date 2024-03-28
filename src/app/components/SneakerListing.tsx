"use client";

import Navbar from "../components/Navbar";
import SneakerCard from "../components/SneakerCard";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Provider, useSelector } from "react-redux";
import Cart from "../components/Cart";
import appStore from "../utils/store";
import error from "next/error";

type StoreObj = {
  user: string;
  cart: { items: []; showCartPage: boolean };
};

export const Page = () => {
  const showCartPage = useSelector(
    (store: StoreObj) => store?.cart?.showCartPage
  );

  // STATES
  const [sneakerList, setSneakerList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // GET SNEAKERS API CALL
  const getSneakers = async () => {
    try {
      const data = await axios.get(
        "http://localhost:3000/api/v1/sneakers?page=" + page
      );
      const resp = data?.data?.data;
      setSneakerList((prev: any) => [...prev, ...resp]);
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // HANDLE SCROLL
  const handleScroll = () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (page < 14) {
      getSneakers();
    }
    if (page >= 14) {
      setLoading(false);
    }
  }, [page]);

  return (
    <>
      <div className="relative  h-screen ">
        <Navbar />
        {/*  SNEAKER CONTAINER */}
        <div className="sneaker-container transition-all  duration-1000  py-24   h-20 w-10/12 mx-auto gap-4  flex flex-wrap justify-between ">
          {sneakerList.map((sneaker: any) => (
            <Link href={"/sneaker/" + sneaker?.id} key={sneaker?.id}>
              <SneakerCard
                main_picture_url={sneaker?.main_picture_url}
                brand_name={sneaker?.brand_name}
                name={sneaker?.name}
                retail_price_cents={sneaker?.retail_price_cents}
              />
            </Link>
          ))}
          {loading && <Loader />}
        </div>
        {/*  CART PAGE */}
        {showCartPage && <Cart />}

        {/*  GRAY OVERLAY */}
        {showCartPage && (
          <div className="z-10 absolute top-0 left-0 bg-black bg-opacity-50 h-screen w-screen  "></div>
        )}
      </div>
    </>
  );
};

const SneakerListing = () => {
  return (
    <Provider store={appStore}>
      <Page />
    </Provider>
  );
};

export default SneakerListing;
