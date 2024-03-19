import Navbar from "../components/Navbar";
import SneakerCard from "../components/SneakerCard";
import Link from "next/link";
import axios from "axios";

const page = async () => {
  // GET SNEAKERS API CALL
  const getSneakers = async () => {
    const data = await axios.get("http://localhost:3000/api/v1/sneakers");
    return data?.data?.data?.sneakers;
  };

  const sneakerList = await getSneakers();

  return (
    <div>
      <Navbar />
      {/*  SNEAKER CONTAINER */}
      <div className="py-24  h-20 w-10/12 mx-auto gap-4  flex flex-wrap justify-between ">
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
      </div>
    </div>
  );
};

export default page;
