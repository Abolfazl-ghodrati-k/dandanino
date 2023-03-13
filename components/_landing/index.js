import ReactPlayer from "react-player";
import React, { useEffect, useState } from "react";
import Hero from "../Hero";
import Products from "../Products";
import Options from "../Options";
import Customers from "../Customers";
import BetterThanUs from "../BetterThanUs";
import Comments from "../Comments";
import { useRouter } from "next/router";

export default function Landing({ products }) {
  const [playerReady, setplayerReady] = useState(false);
  const router = useRouter();
  // console.log(products)
  useEffect(() => {
    setplayerReady(true);
  }, []);
  useEffect(() => {
    if (router.query?.id) {
      router.push(`/#${router.query?.id}`);
    }
  });
  return (
    <div className="w-full">
      <Hero products={products} />
      <Options />
      <Customers />

      {playerReady && (
        <div className="player-wrapper">
          <ReactPlayer
            url="/Images/Gallery/video.mp4"
            controls={true}
            width="100%"
            height="100%"
            className="react-player"
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
