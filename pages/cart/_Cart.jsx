import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineDelete, AiOutlineMinus } from "react-icons/ai";
import { PersianNumber } from "react-persian-currency";
import useDividedPrice from "../../hooks/useDividedPrice";
import { Store } from "../../utils/Store";

export default function Card({ cart, lastItem, firstItem }) {
  const { state, dispatch } = useContext(Store);

  const FinalString = useDividedPrice(cart.quantity * cart.price);
  const unitPrice = useDividedPrice(cart.price)

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const IncreaseQua = (item) => {
    const cartQuantity = cart.quantity;
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity: cartQuantity + 1 },
    });
    console.log(cart);
  };
  const decreaseQua = (item) => {
    const cartQuantity = cart.quantity;
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity: cartQuantity - 1 },
    });
  }
  return (
    <div
      className={`bg-[#F9FAFB] w-full flex justify-start text-right items-center p-2 ${
        lastItem
          ? "border border-r-0 border-l-0 border-b-0 border-t-1"
          : firstItem
          ? ""
          : "border border-r-0 border-l-0 border-b-1 border-t-0"
      }`}
    >
      <div className="w-full flex justify-start text-right items-center">
        <div className="flex max-w-[150px] skh:max-w-[220px] mt-2 flex-col items-center justify-between ml-4">
          <div>
            <Image src={cart.image} alt="محصول" width={180} height={120} />
          </div>
          <div className="border max-w-[130px] rounded-lg mt-3 border-gray flex flex-row-reverse justify-between items-center p-2 w-full">
            <div className="flex justify-center items-center">
              {cart.quantity == 1 ? (
                <span
                  className="hover:bg-slate-300 rounded p-1 transition-all cursor-pointer"
                  onClick={() => removeItemHandler(cart)}
                >
                  <AiOutlineDelete size={20} />
                </span>
              ) : (
                <span onClick={()=> decreaseQua(cart)} className="hover:bg-slate-300 rounded p-1 transition-all cursor-pointer">
                  <AiOutlineMinus size={20} />
                </span>
              )}
            </div>
            <div className="mt-1">
              <PersianNumber>{cart.quantity}</PersianNumber>
            </div>
            <div className="hover:bg-slate-300 rounded p-1 transition-all cursor-pointer" onClick={() => IncreaseQua(cart)}>
              <AiOutlinePlus size={20} />
            </div>
          </div>
        </div>
        <div className="flex h-[190px] pt-3 text-right flex-col items-start justify-start mt-3">
          <p className="text-[black] text-[.9rem]">{cart.name}</p>
          <div className="text-[.8rem] text-[gray] my-1">
            <PersianNumber>{unitPrice}</PersianNumber> تومان
          </div>
          <p className="text-[.8rem] text-[gray]">{cart.description}</p>
          <p className="text-[.8rem] text-[black] mt-[3.5rem] md:mt-[4.3rem] bg-slate-100 p-2 rounded">
            <PersianNumber>{FinalString}</PersianNumber>
            <span className="mx-1">تومان</span>
          </p>
        </div>
      </div>
      <span
        className="mb-auto mt-5 hover:bg-slate-300 rounded p-1 transition-all cursor-pointer"
        onClick={() => removeItemHandler(cart)}
      >
        <AiOutlineDelete size={30} />
      </span>
    </div>
  );
}
