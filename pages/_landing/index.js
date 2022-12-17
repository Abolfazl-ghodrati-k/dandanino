import React, { useEffect } from "react";
import Hero from "../../components/Hero";
import Products from "../products/_products";

export default function Landing({products}) {
  // console.log(products)
  return (
    <div className="w-full">
      <Hero products={products}/>
      {products ? <Products products={products} /> : "loading..."}
    </div>
  );
}


