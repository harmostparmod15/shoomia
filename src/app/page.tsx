import Image from "next/image";
import Navbar from "./components/Navbar";
import Body from "./components/Body";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Body />
    </>
  );
};

export default function Home() {
  return <Navbar />;
}
