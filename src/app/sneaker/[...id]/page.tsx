import Navbar from "@/app/components/Navbar";
import SneakerDetails from "@/app/components/SneakerDetails";
import SneakerRecommendation from "@/app/components/SneakerRecommendation";
import axios from "axios";

export default async function Page({ params }: { params: { id: number[] } }) {
  // GETTING ID OF SNEAKER
  const searchQuery: number = Number(...params.id);

  // GET SNEAKER/:id API CALL
  const getSneaker = async (searchQuery: number) => {
    const data = await axios.get(
      "http://localhost:3000/api/v1/sneaker?q=" + searchQuery
    );
    return data.data;
  };

  const snkrObj = await getSneaker(searchQuery);

  return (
    <>
      <Navbar />
      <SneakerDetails {...snkrObj.data[0]} />
      <SneakerRecommendation />
    </>
  );
}
