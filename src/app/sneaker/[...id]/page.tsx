"use client";

import Navbar from "@/app/components/Navbar";
import SneakerDetails from "@/app/components/SneakerDetails";
import SneakerRecommendation from "@/app/components/SneakerRecommendation";
import appStore from "@/app/utils/store";
import axios from "axios";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(appStore);

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
        <PersistGate persistor={persistor}>
          <SneakerDetails {...snkrObj.data[0]} />
          <SneakerRecommendation />
        </PersistGate>
      </Provider>
    </>
  );
}
