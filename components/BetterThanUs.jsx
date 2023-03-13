import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";
import { Store } from "../utils/Store";

function BetterThanUs({products}) {
  const { state, dispatch } = useContext(Store);
  const [product, setproduct] = useState(null)

  useEffect(() => {
    products.map((product) => {
      if (product?.slug == "RevyLine-RL450-white") {
        setproduct(product)
      } else {
        return
      }
    });
  },[])

  console.log(product)


  const addToCartHandler = (slug, Selectedproduct) => {
    const existItem = state.cart.cartItems.find((x) => x.slug === slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product?.countInStock < quantity) {
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...Selectedproduct, quantity: quantity },
    });
    toast.success(`محصول ${slug} به سبد خرید افزوده شد.`)
  };

  return (
    <div className="min-h-[110vh] w-full bg-gradient-to-t to-[#333939] from-[#58605f] mt-[4rem] py-[5.5rem] px-[2rem]">
      <div className="flex flex-col items-center justify-center ml:flex-row ml:justify-start ml:gap-[4rem]">
        <div className="">
          <Image src={"/Images/watterjet2.jpg"} width={700} height={700} />
        </div>
        <div className="flex flex-col items-start [&>*]:text-right ml:self-start mt-5 ml:mt-[15%] min-w-[365px]">
          <h1 className="text-[#d0d5dd] text-[2rem] my-[2rem] font-black">
            مثل دندانینو سراغ دارید !؟
          </h1>
          <div className="flex justify-start items-center mb-4 text-[#d0d5dd] gap-[8px] mr-1">
            <img src="/Images/circuit-board.svg" alt="" />
            <p>استفاده از با کیفیت ترین قطعات</p>
          </div>
          <div className="flex justify-start items-center mb-4 text-[#d0d5dd] gap-[8px] mr-1">
            <img src="/Images/guarantee2.svg" alt="" />
            <p>1 سال گارانتی بی قید و شرط.</p>
          </div>
          <div className="flex justify-start items-center mb-4 text-[#d0d5dd] gap-[8px] mr-1">
            <img src="/Images/europe2.svg" alt="" />
            <p>طراحی شده مطابق با استاندارد های اتحادیه اروپا</p>
          </div>
          <div className="flex justify-start items-center mb-4 text-[#d0d5dd] gap-[8px] mr-1">
            <img src="/Images/cover.svg" alt="" />
            <p>دارای کیف محافظ پارچه ایی</p>
          </div>
          <div className="flex justify-start items-center mb-10 text-[#d0d5dd] gap-[8px] mr-1">
            <img src="/Images/eye-off.svg" alt="" />
            <p>دارای نمایشگر پنهان</p>
          </div>
          <div className="flex gap-[50px] items-start flex-row justify-between w-full md:items-center cursor-pointer">
            <button
              className="tertiary-button"
              onClick={() => addToCartHandler("RevyLine-RL450-white", product)}
            >
              <HiOutlineShoppingBag size={20} />
              افزودن به سبد خرید
            </button>
            <p className="flex text-right items-center justify-between gap-2 p-2 px-3 text-white text-[.9rem]  hover:gap-3 ">
              <span>اطلاعات بیشتر</span>
              <IoIosArrowBack size={20} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



export default BetterThanUs;
