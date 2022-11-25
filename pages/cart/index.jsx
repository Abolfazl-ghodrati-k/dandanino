import React, { useContext } from "react";
import { Store } from "../../utils/Store";
import Layout from "../../components/Layout";

export default function Cart() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  console.log(cartItems);

  return (
    <Layout title={"سبد خرید"}>
      <div className="flex flex-col items-end max-w-[97vw]">
        <h4>سبد خرید</h4>
      </div>
    </Layout>
  );
}
