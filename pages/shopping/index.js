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
  });

  const submitHandler = ({
    firstName,
    lastName,
    address,
    city,
    postalCode,
    melliCode,
  }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { firstName, lastName, melliCode, address, city, postalCode },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          firstName,
          lastName,
          melliCode,
          address,
          city,
          postalCode,
        },
      })
    );

    router.push("/payment");
  };

  return (
    <Layout title={"صفحه خرید"}>
      <CheckoutWizard activeStep={1} />
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>نام</label>
          <input
            type="text"
            id="firstName"
            autoFocus
            {...register("firstName", {
              required: "لطفا نام خود را وارد کنید",
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div>
          <label>نام خانوادگی</label>
          <input
            type="text"
            id="lastName"
            
            {...register("lastName", {
              required: "لطفا نام خانوادگی خود را وارد کنید",
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div>
          <label>کد ملی</label>
          <input
            type="text"
            id="melliCode"
            
            {...register("melliCode", {
              required: "لطفا کد ملی خود را وارد کنید",
              minLength: {
                value: 10,
                message: "کد ملی را به فرمت صحیح وارد کنید",
              },
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div>
          <label>کد پستی</label>
          <input
            type="text"
            id="postalCode"
            
            {...register("postalCode", {
              required: "لطفا کد پستی خود را وارد کنید",
              minLength: {
                value: 10,
                message: "کد پستی را به فرمت صحیح وارد کنید",
              },
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div>
          <label>استان</label>
          <input
            type="text"
            id="city"
            
            {...register("city", {
              required: "لطفا استان خود را وارد کنید",
              minLength: { value: 3, message: "کجا زندگی میکنی چاقال ؟" },
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div>
          <label>آدرس</label>
          <input
            type="text"
            id="address"
            
            {...register("address", {
              required: "لطفا آدرس خود را وارد کنید",
              minLength: { value: 3, message: "کجا زندگی میکنی چاقال ؟" },
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <input type="submit" value="تایید" />
      </form>
    </Layout>
  );
}

export default ShippingScreen;
ShippingScreen.auth = true;
