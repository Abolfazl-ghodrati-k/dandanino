import React, { useContext } from "react";
import Image from "next/image";
import banner from "../public/Images/banner.jpeg";
import { HiOutlineShoppingBag, HiOutlineMenu } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { CiDeliveryTruck } from "react-icons/ci";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function Hero({ products }) {
  const { state, dispatch } = useContext(Store);
  const product = products.find((x) => x.slug === "Fairywill-5020E");
  const router = useRouter();

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(
      (x) => x.slug === "Fairywill-5020E"
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
    toast.success(`محصول Fairywill-F30 به سبد خرید افزوده شد.`);
  };

  return (
    <div className="relative hero -z-1 flex w-[95vw] sm:w-[97vw] sm:px-3 mx-auto justify-start items-start">
      <div className="flex flex-col items-center justify-start w-[100%] p-1 sm:mt-[4rem] mt-[2rem] md:mt-[1rem] ml:mt-[2rem] mr-4">
        <p className="text-[1rem] sm:text-[1.43em] md:text-[1.6rem] font-bold text-right w-full sm:py-4 text-[#98a2b3]">
          واتر&zwnj;جت دندانینو
        </p>
        <h2 className="w-full text-right text-[1.65rem] mt-4 sm:text-[2.2rem]  md:text-[3rem] ml:text-[3.5em] font-extrabold">
          دقیق، سریع <br />
          زیبا&zwnj;تر از همیشه
        </h2>
        <p className="w-full text-right mt-7 text-[0.6rem] md:text-[1rem] max-w-[45%] md:max-w-[40%] ml-auto text-[#98a2b3] ">
          با واتر جت دندانینو زیباترین لبخند را خواهید داشت، سبک ،کارا ،قیمت
          مناسب، تحویل سریع از مزایای واتر جت ماست. کلا خیلی واتر جت خوبیم و این
          چیزا، و واقعا خیلی پیگیری که داری این متنو میخونی بخر تمومش کن.
        </p>
        <div className="w-[45%] flex-col items-end justify-start ml-auto my-4 mt-7">
          <div className="flex justify-start items-center w-full">
            <button
              onClick={addToCartHandler}
              className="text-[.6rem] md:text-[.7rem]   p-3 px-5 rounded-lg bg-[#3a9e9b] shadow-md shadow-[#35928F] hover:shadow-none hover:bg-[#35928F] text-[white] transition-shadow duration-300  flex justify-center items-center  sm:ml-[2rem] lg:ml-[4rem]"
            >
              <HiOutlineShoppingBag size={20} />
              <span className="mx-2 mt-1">افزودن به سبد خرید</span>
            </button>
            <button
              className="text-[.8rem] md:text-[1.1rem] justify-between items-center hidden sm:flex flex-row-reverse group transition-all"
              onClick={() => {
                router.push("/products/Fairywill-5020E");
              }}
            >
              <IoIosArrowBack size={20} />
              <span className="ml-2 group-hover:ml-4">اطلاعات بیشتر</span>
            </button>
          </div>
          <div className="flex justify-start items-center text-[.9rem] md:text-[1.1rem] mt-6 mr-2">
            <div className="flex items-center text-[orange]">
              <span className="mx-2">ارسال رایگان</span>
              <CiDeliveryTruck size={25} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute overflow-x-clip -left-[10rem] top-10 w-[300px] ms:w-[300px] sm:left-0 sm:w-[350px] md:w-[400px] ml:w-[580px]">
        <div className="hidden sm:flex sm:w-full">
          <Image src={banner} width={550} alt="banner" />
        </div>
        <div className="w-full absolute -right-[12.8rem] -scale-x-[1] md:right-0 md:w-auto sm:hidden sm:w-0 rotate-[5deg]">
          <Image src={banner} width={550} alt="banner" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
