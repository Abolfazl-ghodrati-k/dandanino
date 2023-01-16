import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import ImageSlider from "./ImageSlider";

function Specialproduct({ product }) {
  const { state, dispatch } = useContext(Store);
  const [Products, setProducts] = useState([]);
  const [ActiveNumb, setActiveNumb] = useState(0);

  useEffect(() => {
    setProducts(product);
  }, [product]);

  const router = useRouter();

  const addToCartHandler = (slug, Selectedproduct) => {
    const existItem = state.cart.cartItems.find((x) => x.slug === slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...Selectedproduct, quantity: quantity },
    });
  };
  if (!Products.length) {
    return <div>loading...</div>;
  }

  return (
    <div className="h-full flex flex-col items-center justify-start">
      <div className=" w-[330px] md:w-auto grid place-items-center mt-[2rem] rounded-md bg-white p-1">
        <ImageSlider
          Images={Products}
          setActiveNumb={setActiveNumb}
          ActiveNumb={ActiveNumb}
          width={350}
          height={200}
        />
      </div>
      <div className=" w-full px-[3.1rem] text-black mt-3 text-[.8rem]">
        <h1>{Products[0].name}</h1>
        <p>برند : {Products[0].brand}</p>
        <p>{Products[0].description}</p>
        <p>امتیازات: {Products[0].rating}</p>
        <p>نظرات: {Products[0].numReviews}</p>
        <div className="flex flex-col items-start mt-4 mb-2 text-[.8rem] [&>*]:w-full w-full md:flex-row md:items-center md:justify-between md:[&>*]:w-[50%]">
          <button
            className="tirtiary-button mb-2 md:mb-0"
            onClick={() => {
              addToCartHandler(Products[ActiveNumb].slug, Products[ActiveNumb]);
            }}
          >
            افزودن به سبد خرید
          </button>
          <button
            className="group my-2 md:my-0"
            onClick={() => {
              router.push(`/products/${Products[0].slug}`);
            }}
          >
            اطلاعات بیشتر -{" "}
            <span className="group-hover:mr-0 transition-all -mr-1">&gt;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Specialproduct;
