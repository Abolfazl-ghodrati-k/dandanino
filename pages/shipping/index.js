import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CheckoutWizard from "../../components/CheckoutWizard";
import Layout from "../../components/Layout";
import { Store } from "../../utils/Store";

function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { data: session } = useSession();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;

  useEffect(() => {
    if (session?.user) {
      setValue("firstName", shippingAddress.firstName);
      setValue("lastName", shippingAddress.lastName);
      setValue("melliCode", shippingAddress.melliCode);
      setValue("address", shippingAddress.address);
      setValue("city", shippingAddress.city);
      setValue("postalCode", shippingAddress.postalCode);
    } else {
      router.push("/");
    }
  }, [setValue, shippingAddress]);

  const submitHandler = ({
    firstName,
    lastName,
    address,
    city,
    postalCode,
    nationalCode,
  }) => {
    // console.log("melliCode")
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { firstName, lastName, nationalCode, address, city, postalCode },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          firstName,
          lastName,
          nationalCode,
          address,
          city,
          postalCode,
        },
      })
    );

    router.push(router.query.redirect || "/payment");
  };

  return (
    <Layout title={"صفحه خرید"}>
      <CheckoutWizard activeStep={1} />
      <form className="w-full flex flex-col items-end">
        <div className="flex w-full items-center justify-start mr-1">
          <label>نام : </label>
          <div className="flex flex-col items-end mr-auto">
            <input
              type="text"
              className="mr-auto ml-2 w-[250px]"
              id="firstName"
              autoFocus
              {...register("firstName", {
                required: "لطفا نام خود را وارد کنید",
              })}
            />
            {errors.firstName && (
              <div className="text-red-500 mt-1 text-right text-right w-full text-[.8rem]">
                {errors.firstName.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full items-center justify-start mr-1 mt-1">
          <label>نام خانوادگی : </label>
          <div className="flex flex-col items-end mr-auto">
            <input
              type="text"
              id="lastName"
              className="mr-auto ml-2 w-[250px]"
              {...register("lastName", {
                required: "لطفا نام خانوادگی خود را وارد کنید",
              })}
            />
            {errors.lastName && (
              <div className="text-red-500 text-right w-full text-[.8rem]">
                {errors.lastName.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full items-center justify-start mr-1 mt-1">
          <label>کد ملی : </label>
          <div className="flex flex-col items-end mr-auto">
            <input
              type="text"
              id="nationalCode"
              className="mr-auto ml-2 w-[250px]"
              {...register("nationalCode", {
                required: "لطفا کد ملی خود را وارد کنید",
                minLength: 10,
              })}
            />
            {errors.nationalCode && (
              <div className="text-red-500 text-right w-full text-[.8rem]">
                {errors.nationalCode.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full items-center justify-start mr-1 mt-1">
          <label>کد پستی : </label>
          <div className="flex flex-col items-end mr-auto">
            <input
              type="text"
              id="postalCode"
              className="mr-auto ml-2 w-[250px]"
              {...register("postalCode", {
                required: "لطفا کد پستی خود را وارد کنید",
                minLength: {
                  value: 10,
                  message: "کد پستی را به فرمت صحیح وارد کنید",
                },
              })}
            />
            {errors.postalCode && (
              <div className="text-red-500 text-right w-full text-[.8rem]">
                {errors.postalCode.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full items-center justify-start mr-1 mt-1">
          <label>استان : </label>
          <div className="flex flex-col items-end mr-auto ">
            <input
              type="text"
              id="city"
              className="mr-auto ml-2 w-[250px]"
              {...register("city", {
                required: "لطفا استان خود را وارد کنید",
                minLength: { value: 3, message: "کجا زندگی میکنی چاقال ؟" },
              })}
            />
            {errors.city && (
              <div className="text-red-500 text-right w-full text-[.8rem]">
                {errors.city.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full items-start justify-start mt-2 mr-1 ">
          <label>آدرس : </label>
          <div className="flex flex-col items-end mr-auto">
            <textarea
              type="text"
              id="address"
              className=" ml-2 w-[250px] h-[100px] text-[.6rem] flex items-start justify-start"
              {...register("address", {
                required: "لطفا آدرس خود را وارد کنید",
                minLength: { value: 3, message: "کجا زندگی میکنی چاقال ؟" },
              })}
            />
            {errors.address && (
              <div className="text-red-500 text-right w-full text-[.8rem]">
                {errors.address.message}
              </div>
            )}
          </div>
        </div>
        <button
          className="w-[120px] mt-3 ml-2  bg-[pink]"
          onClick={handleSubmit(submitHandler)}
        >
          تایید
        </button>
      </form>
    </Layout>
  );
}

export default ShippingScreen;
ShippingScreen.auth = true;
