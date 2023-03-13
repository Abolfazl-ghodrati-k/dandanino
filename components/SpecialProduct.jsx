import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import ImageSlider from "./ImageSlider";
import { toast } from "react-toastify";

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
    toast.success(`محصول ${slug} به سبد خرید افزوده شد.`)
  };

  if (!Products.length) {
    return <div>loading...</div>;
  }

  return (
    <div className="h-full flex flex-col items-center justify-start md:px-2 ">
      <div className=" w-[330px]  md:w-auto grid place-items-center mt-[2rem] rounded-md bg-white p-1">
        <ImageSlider
          Images={Products}
          setActiveNumb={setActiveNumb}
          ActiveNumb={ActiveNumb}
          width={350}
          height={200}
        />
      </div>
      <div className=" w-full text-center text-black mt-5 text-[.8rem]">
        <h1 className="text-[1.4rem]">{Products[0].name}</h1>
        <p className="text-[hsla(0,0%,43%,1)] -mt-1 text-[.9rem] mb-2">
          {Products[0].description}
        </p>
        <div className="text-right mr-[9.3rem] mb-[30px]">
          <p>برند : {Products[0].brand}</p>
          <p>امتیازات: {Products[0].rating}</p>
          <p>نظرات: {Products[0].numReviews}</p>
        </div>
        <div className="flex  mt-4 mb-6 text-[.8rem] mx-auto  w-full flex-row items-center justify-around md:[&>*]:w-[50%]">
          <button
            className="tirtiary-button mb-5 md:mb-0 md:text-[.6rem] ml:text-[.8rem] max-w-[200px] px-[15px]"
            onClick={() => {
              addToCartHandler(Products[ActiveNumb].slug, Products[ActiveNumb]);
            }}
          >
            افزودن به سبد خرید
          </button>
          <button
            className="group my-2 md:my-0 flex items-center justify-center"
            onClick={() => {
              router.push(`/products/${Products[ActiveNumb].slug}`);
            }}
          >
            اطلاعات بیشتر {" "}
            <span className="group-hover:mr-2 mr-1 mt-1 transition-all  ">
              &gt;
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Specialproduct;
