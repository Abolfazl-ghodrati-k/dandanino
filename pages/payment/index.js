import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CheckoutWizard from "../../components/CheckoutWizard";
import Layout from "../../components/Layout";
import { Store } from "../../utils/Store";

function index() {
  const [selectedPaymentMethod, setselectedPaymentMethod] = useState("");

  const router = useRouter();

  const {
    state: { cart },
    dispatch,
  } = useContext(Store);

  const { shippingAddress, paymentMethod } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setselectedPaymentMethod((pm) => (pm = paymentMethod || ""));
  }, [paymentMethod, router, shippingAddress.address]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod.id) {
      return toast.error("ریدی دایی جان");
    }
    console.log(cart && cart);
    if (cart) {
      dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          paymentMethod: selectedPaymentMethod,
        })
      );
      router.push("/placeorder");
    }else {
      return
    }
  };
  return (
    <Layout>
      <CheckoutWizard activeStep={2} />
      <form onSubmit={submitHandler} className="mx-1 min-h-screen bg-[#ecf0f3]">
        <h1 className="text-[1.3rem] mb-2 font-bold">انتخاب نحوه پرداخت</h1>
        <div>
          {[{ title: "پرداخت در محل", id: 1 }].map((payment) => {
            return (
              <div
                key={payment.id}
                onClick={() => {
                  setselectedPaymentMethod(payment);
                }}
                className="radiogroup p-2 mb-2 flex items-center justify-start cursor-pointer"
              >
                <div
                  className={`indicator ml-2 ${
                    payment.id == selectedPaymentMethod.id
                      ? "after:bg-[#c2d6e5] before:bg-[#3b3f42]"
                      : ""
                  }`}
                ></div>
                {payment.title}
              </div>
            );
          })}
        </div>
        <div className="mx-2 flex justify-between">
          <button onClick={() => router.push("/shipping")} type="button">
            برگشت
          </button>
          <button className="bg-[#dc929e] p-2 px-3 hover:bg-[pink] rounded-md">
            تایید
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default index;
