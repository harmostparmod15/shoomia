"use client";

import Navbar from "@/app/components/Navbar";
import SneakerDetails from "@/app/components/SneakerDetails";
import SneakerRecommendation from "@/app/components/SneakerRecommendation";
import appStore from "@/app/utils/store";
import axios from "axios";
import { Provider } from "react-redux";

export default async function Page({ params }: { params: { id: number[] } }) {
  // GETTING ID OF SNEAKER
  const searchQuery: number = Number(...params.id);

  // GET SNEAKER/:id API CALL
  const getSneaker = async (searchQuery: number) => {
    const data = await axios.get(
      "https://shoomia.vercel.app/api/v1/sneaker?q=" + searchQuery
    );
    return data.data;
  };

  const snkrObj = await getSneaker(searchQuery);

  return (
    <>
      <Navbar />
      <Provider store={appStore}>
        <SneakerDetails {...snkrObj.data[0]} />
      </Provider>
      <SneakerRecommendation />
    </>
  );
}
