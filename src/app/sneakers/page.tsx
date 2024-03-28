"use client";

import dynamic from "next/dynamic";

const SneakerListing = dynamic(() => import("../components/SneakerListing"), {
  ssr: false,
});

export default SneakerListing;
