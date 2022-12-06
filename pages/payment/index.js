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
      return router.push("/shopping");
    }
    setselectedPaymentMethod(pm => pm = paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("ریدی دایی جان");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );
    router.push('/placeorder')
  };
  return (
    <Layout>
      <CheckoutWizard activeStep={2} />
      <form onSubmit={submitHandler}>
        <h1>انتخاب نحوه پرداخت</h1>
        <div>
          {[{title:"پرداخت در محل",id:1}].map((payment) => {
            return (
              <div key={payment.id}>
                <input
                  name="paymentMethod"
                  className="p-2 outline-none focus:ring-0"
                  id="payment"
                  type={"radio"}
                  checked={selectedPaymentMethod === payment.id}
                  onChange={() => setselectedPaymentMethod(payment.id)}
                />
                <label htmlFor="payment" className="p-2">
                  {payment.title}{payment.id}
                </label>
              </div>
            );
          })}
        </div>
        <div className="mb-4 flex justify-between">
          <button onClick={() => router.push("/shopping")} type="button">
            برگشت
          </button>
          <button>تایید</button>
        </div>
      </form>
    </Layout>
  );
}

export default index;
