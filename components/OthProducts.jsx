import React from "react";
import Image from "next/image";
import { Store } from "../utils/Store";
import { useContext } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function OthProducts({ product }) {
  const { state, dispatch } = useContext(Store);
  const router = useRouter()

  const addToCartHandler = (slug) => {
    console.log(slug)
    const existItem = state.cart.cartItems.find((x) => x.slug === slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      setAlert(true);
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: quantity },
    });
    toast.success(`محصول ${slug} به سبد خرید افزوده شد.`)
  };
  return (
    <div className=" flex flex-col items-center justify-start  md:flex-row md:items-center md:justify-start gap-6 mt-3 md:mt-0 md:px-4 md:pr-7">
      <div className="bg-[white] grid place-items-center w-[330px] md:w-auto p-1 rounded-md my-auto">
        <Image
          width={220}
          height={30}
          alt={product.slug}
          src={process.env.NEXT_PUBLIC_BASE_URL + product.image}
        />
      </div>
      <div className="text-[.8rem] w-full px-[3.1rem] md:px-0  md:w-[15rem] text-[black] mt-4 md:mt-8 flex flex-col items-start justify-start">
        <h1 className="grid place-items-center ">{product.name}</h1>
        <p>برند : {product.brand}</p>
        <p>{product.description}</p>
        <p>امتیازات: {product.rating}</p>
        <p>نظرات: {product.numReviews}</p>
        <div className="flex flex-col items-start mt-5 md:mt-11 text-[.8rem] [&>*]:w-full w-full  md:flex-row md:items-center md:justify-between md:[&>*]:w-[50%]">
          <button
            className="tirtiary-button text-[.6rem]"
            onClick={() => {
              addToCartHandler(product.slug);
            }}
          >
            افزودن به سبد خرید
          </button>
          <button className="group my-4 md:my-0" onClick={() => {router.push(`/products/${product.slug}`)}}>
            اطلاعات بیشتر -{" "}
            <span className="group-hover:mr-[0rem] transition-all  -mr-[.19rem] mt-[0.18rem]">&gt;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OthProducts;
