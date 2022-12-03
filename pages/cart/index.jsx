import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../utils/Store";
import Layout from "../../components/Layout";
import Card from "./_Cart";
import Link from "next/link";
import { CgShoppingBag } from "react-icons/cg";
import PersianNumber from "react-persian-currency/lib/PersianNumber";
import useDividedPrice from "../../hooks/useDividedPrice";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Cart() {
  const [Total, setTotal] = useState(1);
  const { state, dispatch } = useContext(Store);
  const FinalPrice = useDividedPrice(Total);
  const {
    cart: { cartItems },
  } = state;

  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (cartItems) {
      setTotal(
        (total) =>
          (total = cartItems.reduce((a, c) => {
            return a + c.quantity * c.p;
          }, 0))
      );
    }
    console.log(FinalPrice);
  }, [FinalPrice, cartItems]);

  const Shopping = () => {
    if (session?.user) {
      router.push({ pathname: "/shopping" });
    } else {
      router.push({
        pathname: "/profile",
        query: { redirect: "/shopping" },
      });
    }
  };

  return (
    <Layout title={"سبد خرید"}>
      <div className="flex flex-col items-end max-w-[95vw] mx-auto">
        <div className="mt-2 w-full flex flex-col sm:flex-row justify-start items-center">
          {cartItems.length === 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-start mt-[6rem] ">
              <div className="mb-2">
                <CgShoppingBag size={60} />
              </div>
              <p className="text-[1rem] mt-2">سبد خرید شما خالیست</p>
              <p className="text-[#667085] text-[.8rem] font-light mb-5">
                هیچ موردی در سبد شما یافت نشد!
              </p>
              <div className="bg-[#41cbc6] text-[white] text-[.9rem] p-2 rounded-md flex items-center justify-center">
                <Link href="/">بازگشت به صفحه اصلی</Link>
              </div>
            </div>
          ) : (
            <>
              <div className="w-full sm:w-[64%] flex flex-col items-start justify-start max-h-[440px] overflow-y-hidden bg-[white] text-right shadow-sm rounded-md shadow-[gray] pt-2">
                {" "}
                <h4 className="text-[.9rem] pr-2">سبد خرید شما</h4>
                <small className="flex flex-row-reverse justify-start pr-2 items-center mt-1 text-[gray] text-[.7rem]">
                  <span className="mr-1">مورد</span>
                  {cartItems.length > 0 && cartItems.length}
                </small>
                <div className="w-full mt-2 pb-1 flex flex-col items-center justify-start  overflow-scroll ">
                  {cartItems &&
                    cartItems.map((cart, index) => {
                      var lastItem = false;
                      var firstItem = false;
                      console.log(cartItems.length, index + 1);
                      if (
                        cartItems.length > 1 &&
                        index + 1 == cartItems.length
                      ) {
                        lastItem = true;
                      }
                      if (index === 0 && cartItems.length === 1) {
                        firstItem = true;
                      }
                      return (
                        <Card
                          cart={cart}
                          firstItem={firstItem}
                          lastItem={lastItem}
                        />
                      );
                    })}
                </div>
              </div>
              <div className="w-full mt-2 mx-auto flex items-center justify-between p-2 bg-[white] text-right shadow-sm rounded-md shadow-[gray] pt-2 sm:flex-col-reverse sm:mr-2 sm:fixed sm:top-[5rem] sm:left-4 sm:w-[35%] lg:flex-row">
                <div
                  onClick={() => Shopping()}
                  className="bg-[red] sm:mt-3 ml:mt-0 text-[white] p-2 px-3 rounded-md text-[.8rem] cursor-pointer"
                >
                  ادامه فرایند خرید
                </div>
                <div className="flex flex-col items-end justify-center">
                  <p className="text-[gray] text-[.6rem] px-1 mb-1">
                    جمع سبد خرید
                  </p>
                  <p className="text-[.7rem]">
                    <PersianNumber>{FinalPrice}</PersianNumber>
                    <span className="mx-1">تومان</span>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
