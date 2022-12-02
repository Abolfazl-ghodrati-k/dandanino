import React, { useContext } from "react";
import Image from "next/image";
import banner from "../public/Images/banner.jpeg";
import { HiOutlineShoppingBag, HiOutlineMenu } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { CiDeliveryTruck } from "react-icons/ci";
import { Store } from "../utils/Store";
import { products } from "../utils/data";
import Link from "next/link";

function Hero() {
  const { state, dispatch } = useContext(Store);
  const product = products.find((x) => x.slug === "waterjet-dandanino");

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(
      (x) => x.slug === "waterjet-dandanino"
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      alert("تموم کردیم جانم");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: quantity },
    });
  };

  return (
    <div className="hero relative h-[98vh] -z-1 flex w-[95vw] sm:w-[97vw] sm:px-3 mx-auto justify-start items-start">
      <div className="flex flex-col items-center justify-start w-[100%] p-1 sm:mt-[4rem] mt-[2rem]">
        <p className="text-[0.7rem] md:text-[1.1rem] font-bold text-right w-full sm:py-4 text-[#98a2b3]">
          واتر&zwnj;جت دندانینو
        </p>
        <h2 className="w-full text-right text-[1.6rem] sm:text-[2.2rem]  md:text-[3.2rem] ml:text-[4rem] font-extrabold">
          دقیق، سریع <br />
          زیبا&zwnj;تر از همیشه
        </h2>
        <p className="w-full text-right mt-7 text-[0.6rem] max-w-[45%] ml-auto text-[#98a2b3] ">
          Non pariatur quis dolore duis sint quis ipsum. Commodo elit fugiat
          irure aliquip ullamco. Sint laboris qui sit eu ea proident.
        </p>
        <div className="w-[45%] flex-col items-end justify-start ml-auto my-4">
          <div className="flex justify-start items-center w-full">
            <Link href="/cart">
            <button
              onClick={addToCartHandler}
              className="text-[.5rem] ml:text-[.6rem]  p-3 px-5 rounded-lg bg-[#3a9e9b] shadow-md shadow-[#35928F] hover:shadow-none hover:bg-[#35928F] text-[white] transition-shadow duration-300  flex justify-center items-center  sm:ml-[2rem] lg:ml-[4rem]"
            >
                <HiOutlineShoppingBag size={20} />
                <span className="mx-1">افزودن به سبد خرید</span>
            </button>
              </Link>
            <button className="text-[.8rem] justify-between items-center hidden sm:flex flex-row-reverse">
              <IoIosArrowBack size={20} />
              <span>اطلاعات بیشتر</span>
            </button>
          </div>
          <div className="flex justify-start items-center text-[.9rem] mt-6 mr-2">
            <div className="flex items-center text-[orange]">
              <span className="mx-2">ارسال رایگان</span>
              <CiDeliveryTruck size={25} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-10 w-[165px] ms:w-[300px] sm:w-[350px] md:w-[400px] ml:w-[580px]">
        <Image src={banner} width={550} alt="banner" />
      </div>
    </div>
  );
}

export default Hero;
