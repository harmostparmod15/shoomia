// "use client";

// import Navbar from "../components/Navbar";
// import SneakerCard from "../components/SneakerCard";
// import Link from "next/link";
// import axios from "axios";
// import { useEffect, useRef, useState } from "react";
// import Loader from "../components/Loader";
// import { Provider, useSelector } from "react-redux";
// import Cart from "../components/Cart";
// import appStore from "../utils/store";
// import error from "next/error";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";
// import { toast } from "react-hot-toast/headless";

// const persistor = persistStore(appStore);

// type StoreObj = {
//   user: string;
//   cart: { items: []; showCartPage: boolean };
// };

// export const Page = () => {
//   const showCartPage = useSelector(
//     (store: StoreObj) => store?.cart?.showCartPage
//   );

//   // STATES
//   const [sneakerList, setSneakerList] = useState<any>([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [errPage, setErrPage] = useState(false);
//   // GET SNEAKERS API CALL
//   const getSneakers = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/sneakers?page=" + page);
//       console.log("sn listing ", data);

//       if (!data?.success) {
//         toast.error(data?.error || "Failed to fetch sneakers");
//         setLoading(false);
//         return;
//       }

//       // const resp = Array.isArray(data?.data?.data) ? data.data.data : [];
//       const resp = Array.isArray(data?.data) ? data.data : [];

//       if (resp.length > 0) {
//         setSneakerList((prev: any) => [...prev, ...resp]);
//       } else {
//         toast("No more sneakers to load");
//       }

//       setLoading(false);
//     } catch (error: any) {
//       console.log("err ", error.code ?? error.message);
//       if (error.code === "ERR_NETWORK") {
//         setErrPage(true);
//         toast.error("Network error! Please try again.");
//       } else {
//         toast.error("Something went wrong! Please try again.");
//       }
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (page < 14) {
//       getSneakers();
//     }
//     if (page >= 14) {
//       setLoading(false);
//     }
//   }, [page]);

//   const observerTarget = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           // if (page < 14) {
//           console.log(entries[0]);
//           setLoading(true);
//           setPage((prev) => prev + 1);
//           // } else {
//           // setLoading(false);
//           // }
//         }
//       },
//       { threshold: 1 }
//     );

//     if (observerTarget.current) {
//       observer.observe(observerTarget.current);
//     }

//     return () => {
//       if (observerTarget.current) {
//         observer.unobserve(observerTarget.current);
//       }
//     };
//   }, [observerTarget]);

//   return (
//     <>
//       <div className="relative    ">
//         <Navbar />
//         {/* AXIOS ERROR PAGE  */}
//         <div
//           className={`flex w-full h-[100vh] justify-center items-center flex-col gap-4 ${
//             errPage == true ? "flex" : "hidden"
//           }`}
//         >
//           <h1>Error while Loading click here </h1>
//           <a href="/axios-error">
//             <button className="underline font-bold ">Click</button>
//           </a>
//         </div>
//         {/*  SNEAKER CONTAINER */}
//         <div
//           className={`sneaker-container  transition-all  duration-1000  py-24   h-20 w-10/12 mx-auto gap-4  flex flex-wrap justify-between ${
//             errPage == true ? "hidden" : "flex"
//           }`}
//         >
//           {sneakerList.map((sneaker: any) => (
//             <Link href={"/sneaker/" + sneaker?.id} key={sneaker?.id}>
//               <SneakerCard
//                 main_picture_url={sneaker?.main_picture_url}
//                 brand_name={sneaker?.brand_name}
//                 name={sneaker?.name}
//                 retail_price_cents={sneaker?.retail_price_cents}
//               />
//             </Link>
//           ))}
//           {/*    DISPLAYING LOADER IN BOTTOM */}
//           <div
//             ref={observerTarget}
//             className=" justify-center  mx-auto  flex flex-col gap-4"
//           >
//             {/*  showing load more or you v reach end */}
//             {page <= 14 ? (
//               <h1 className=" load-text text-2xl text-gray-400 font-bold opacity-50  ">
//                 LOAD MORE ....
//               </h1>
//             ) : (
//               <h1 className="load-text text-2xl text-gray-400 font-bold opacity-50  ">
//                 YOU'VE REACHED AT END
//               </h1>
//             )}
//             {loading && <Loader />}
//           </div>
//         </div>
//         {/*  CART PAGE */}
//         {showCartPage && <Cart />}

//         {/*  GRAY OVERLAY */}
//         {showCartPage && (
//           <div className="z-10 absolute top-0 left-0 bg-black bg-opacity-50 h-screen w-screen  "></div>
//         )}
//       </div>
//     </>
//   );
// };

// const SneakerListing = () => {
//   return (
//     <Provider store={appStore}>
//       <PersistGate persistor={persistor}>
//         <Page />
//       </PersistGate>
//     </Provider>
//   );
// };

// export default SneakerListing;

"use client";

import Navbar from "../components/Navbar";
import SneakerCard from "../components/SneakerCard";
import Link from "next/link";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Loader from "../components/Loader";
import { Provider, useSelector } from "react-redux";
import Cart from "../components/Cart";
import appStore from "../utils/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { toast } from "react-hot-toast";

const persistor = persistStore(appStore);

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
  const [hasMore, setHasMore] = useState(true);
  const [errPage, setErrPage] = useState(false);

  const observerTarget = useRef<HTMLDivElement | null>(null);

  // GET SNEAKERS API CALL
  const getSneakers = async (currentPage: number) => {
    try {
      const { data } = await axios.get("/api/v1/sneakers?page=" + currentPage);
      console.log("sn listing ", data);

      if (!data?.success) {
        toast.error(data?.error || "Failed to fetch sneakers");
        setHasMore(false);
        setLoading(false);
        return;
      }

      const sneakers = Array.isArray(data.data) ? data.data : [];

      if (sneakers.length === 0) {
        toast("No more sneakers to load");
        setHasMore(false);
      } else {
        setSneakerList((prev: any) => [...prev, ...sneakers]);
      }

      setLoading(false);
    } catch (error: any) {
      console.log("err ", error.code ?? error.message);
      toast.error("Something went wrong! Please try again.");
      setLoading(false);
      setErrPage(true);
    }
  };

  // Load sneakers when page changes
  useEffect(() => {
    if (hasMore) {
      setLoading(true);
      getSneakers(page);
    }
  }, [page]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [observerTarget, loading, hasMore]);

  return (
    <>
      <div className="relative">
        <Navbar />

        {/* AXIOS ERROR PAGE */}
        {errPage && (
          <div className="flex w-full h-[100vh] justify-center items-center flex-col gap-4">
            <h1>Error while loading. Click here</h1>
            <Link href="/axios-error">
              <button className="underline font-bold">Click</button>
            </Link>
          </div>
        )}

        {/* SNEAKER CONTAINER */}
        <div
          className={`sneaker-container transition-all duration-1000 py-24 w-10/12 mx-auto gap-4 flex flex-wrap justify-between ${
            errPage ? "hidden" : "flex"
          }`}
        >
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

          {/* Loader & infinite scroll trigger */}
          <div
            ref={observerTarget}
            className="flex flex-col items-center justify-center w-full my-4 gap-4"
          >
            {loading && <Loader />}
            {!loading && !hasMore && sneakerList.length > 0 && (
              <h1 className="text-2xl text-gray-400 font-bold opacity-50">
                YOU'VE REACHED THE END
              </h1>
            )}
            {!loading && sneakerList.length === 0 && (
              <h1 className="text-2xl text-gray-400 font-bold opacity-50">
                No sneakers available
              </h1>
            )}
            {!loading && hasMore && sneakerList.length > 0 && (
              <h1 className="text-2xl text-gray-400 font-bold opacity-50">
                LOAD MORE ....
              </h1>
            )}
          </div>
        </div>

        {/* CART PAGE */}
        {showCartPage && <Cart />}

        {/* GRAY OVERLAY */}
        {showCartPage && (
          <div className="z-10 absolute top-0 left-0 bg-black bg-opacity-50 h-screen w-screen" />
        )}
      </div>
    </>
  );
};

const SneakerListing = () => {
  return (
    <Provider store={appStore}>
      <PersistGate persistor={persistor}>
        <Page />
      </PersistGate>
    </Provider>
  );
};

export default SneakerListing;
