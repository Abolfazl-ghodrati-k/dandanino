import ReactPlayer from "react-player";
import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero";
import Products from "../products/_products";
import Options from "../../components/Options";
import Customers from "../../components/Customers";
import BetterThanUs from "../../components/BetterThanUs";
import Comments from "../../components/Comments";

export default function Landing({ products }) {
  const [playerReady, setplayerReady] = useState(false);
  // console.log(products)
  useEffect(() => {
    setplayerReady(true);
  }, []);
  return (
    <div className="w-full">
      <Hero products={products} />
      <Options />
      <Customers />

      {playerReady && (
        <div className="w-full bg-[#E3E5E8] py-[7rem]">
          <ReactPlayer
            url="/Images/Gallery/video.mp4"
            controls={true}
            style={{
              display: "grid",
              placeItems: "center",
              margin: "0 auto",
              width: "800px !important",
            }}
          />
        </div>
      )}
      {products ? <Products products={products} /> : "loading..."}
      <BetterThanUs products={products} />
      <div className="w-full pb-3 bg-[#ffffff] pt-5">
        <Comments />
      </div>
    </div>
  );
}
