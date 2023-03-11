import React, { useEffect } from "react";
import Hero from "../../components/Hero";
import Products from "../products/_products";
import Options from "../../components/Options";
import Customers from "../../components/Customers";

export default function Landing({products}) {
  // console.log(products)
  return (
    <div className="w-full">
      <Hero products={products}/>
      <Options />
      <Customers />
      {products ? <Products products={products} /> : "loading..."}
    </div>
  );
}


