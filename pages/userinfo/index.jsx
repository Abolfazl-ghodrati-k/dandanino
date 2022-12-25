import React, { useEffect, useState, useContext } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import Cookies from "js-cookie";
import { Store } from "../../utils/Store";
import { toast } from "react-toastify";
import { signOut, useSession } from "next-auth/react";

// A custom validation function. This must return an object

// which keys are symmetrical to our values/initialValues

const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "الزلمی";
  } else if (values.firstName.length > 15) {
    errors.firstName = "نام خود را وارد کنید";
  }

  if (!values.lastName) {
    errors.lastName = "الزلمی";
  } else if (values.lastName.length > 20) {
    errors.lastName = "فحشت بدم ؟";
  }
  if (!values.nationalCode) {
    errors.nationalCode = "الزامی";
  } else if (!/^[0-9]{10}$/i.test(values.nationalCode)) {
    errors.nationalCode = "کد ملی خود را به فرمت صحیح وارد کنید";
  }
  if (!values.postalCode) {
    errors.postalCode = "الزامی";
  } else if (!/^[0-9]{10}$/i.test(values.postalCode)) {
    errors.postalCode = "کد پستی خود را به فرمت صحیح وارد کنید";
  }
  if (!values.city) {
    errors.city = "الزامی";
  } else if (values.city.length < 2) {
    errors.city = "نداریم چنین شهری!";
  }
  if (!values.address) {
    errors.address = "الزامی";
  } else if (values.address.length < 10) {
    errors.address = "لطفا آدرس را دقیق تر وارد کنید";
  }

  return errors;
};

function index() {
  const router = useRouter();
  const { state:{cart}, dispatch } = useContext(Store);

  const submitHandler = (e) => {
    e.preventDefault();
    const error = false;
    if (!error) {
      router.push(router.query.redirect);
    }
  };

  

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      nationalCode: "",
      postalCode: "",
      city: "",
      address: "",
    },
    validate,

    onSubmit: ({
      firstName,
      lastName,
      address,
      city,
      postalCode,
      nationalCode,
    },{setSubmitting}) => {
      console.log(city)
      dispatch({
        type: "SAVE_SHIPPING_ADDRESS",
        payload: {
          firstName,
          lastName,
          nationalCode,
          address,
          city,
          postalCode,
        },
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
      toast.success('اطلاعات شما با موفقیت ثبت شد')
      setTimeout(() => {
        router.push('/')
      },[1000])
    },
  });

  const LogoutHandler = () => {
      Cookies.remove('cart');
      dispatch({ type: 'CART_RESET' });
      signOut({ callbackUrl: '/' });
  }

  useEffect(()=>{
    formik.setValues({
      firstName: cart.shippingAddress.firstName,
      lastName: cart.shippingAddress.lastName,
      city: cart.shippingAddress.city,
      postalCode: cart.shippingAddress.postalCode,
      nationalCode: cart.shippingAddress.nationalCode,
      address: cart.shippingAddress.address,
    })
  },[cart])

  return (
    <Layout>
      <form
        onSubmit={formik.handleSubmit}
        className={`max-w-[95vw] mx-auto flex flex-col`}
      >
        {/* titlle */}
        <div
          className={` flex fixed top-[3.3rem] pt-[2rem] bg-[#ecf0f3] left-[2.5vw] right-[2.5vw] justify-between items-center border border-r-0 border-l-0 border-t-0 border-b-1 border-solid border-[gray] pb-3`}
        >
          <div className="flex flex-col items-start justify-center">
            <p className="text-[1.4rem] font-semibold">اطلاعات شخصی</p>
            <p className="text-[0.9rem] text-[gray] font-normal">
              اطلاعات شخصی خود را در اینجا به روز کنید
            </p>
          </div>
          <div className="flex flex-col sm:flex-row text-right items-start ml-1">
            <button
              type="submit"
              className="transition-all mb-1 sm:w-[100px] bg-[#41cbc6] p-2 text-[.9rem] rounded text-[white] hover:shadow-md "
            >
              ذخیره
            </button>
            <button onClick={()=>{router.push('/')}} className="transition-all mb-1 p-[.4rem] text-[.9rem] sm:w-[100px] sm:mr-2 rounded border border-[gray] border-solid hover:border-[#a59f9f]">
              بستن
            </button>
          </div>
        </div>
        {/* name */}
        <div
          className={`  flex mt-[6rem] md:mt-[4.6rem] md:px-3 flex-col md:flex-row items-between justify-start md:justify-between py-3 border border-r-0 border-l-0 border-t-0 border-b-1 border-solid border-[gray]`}
        >
          <div className="flex flex-col md:flex-row justify-center items-start md:items-center md:justify-between md:w-[60%]">
            <label htmlFor="firstname" className="ml-3 flex items-start">
              نام
            </label>
            <input
              type="text"
              placeholder="نام"
              id="firstName"
              className="w-full max-w-[93vw] md:max-w-[350px] md:mr-auto md:ml-0 mx-auto mt-1 p-2 text-right text-[.95rem] pr-3 rounded-md text-[gray] focus:outline-none border border-solid border-[gray]"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            {formik.errors.firstName && (
              <div className="text-red-500 text-right w-full text-[.8rem] mr-2">
                {formik.errors.firstName}
              </div>
            )}
          </div>
          <div className="mt-5 md:mt-0 flex flex-col justify-between items-start mb-1 md:w-[40%] md:mb-0">
            <label htmlFor="lastname" className="md:hidden">
              نام خانوادگی
            </label>
            <input
              placeholder="نام خانوادگی"
              type="text"
              id="lastName"
              className="w-full  max-w-[93vw]  md:max-w-[350px] md:ml-auto md:mr-[3rem] mx-auto mt-1 p-2 text-right text-[.95rem] pr-3 rounded-md text-[gray] focus:outline-none border border-solid border-[gray]"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
            {formik.errors.lastName && (
              <div className="text-red-500 text-right w-full text-[.8rem] mr-2">
                {formik.errors.lastName}
              </div>
            )}
          </div>
        </div>
        {/* code melli */}
        <div
          className={`w-full md:px-3 border border-r-0 border-l-0 border-t-0 border-b-1 border-solid border-[gray]`}
        >
          <div className="mt-5 flex flex-col md:flex-row md:w-[60%] justify-between items-start mb-1  pb-4">
            <label htmlFor="kodemelli">کد ملی</label>
            <input
              placeholder="کد ملی"
              type="text"
              id="nationalCode"
              className="w-full max-w-[93vw] md:w-[350px] md:mr-auto md:ml-0 mx-auto mt-1 p-2 text-right text-[.95rem] pr-3 rounded-md text-[gray] focus:outline-none border border-solid border-[gray]"
              onChange={formik.handleChange}
              value={formik.values.nationalCode}
            />
            {formik.errors.nationalCode && (
              <div className="text-red-500 text-right w-full text-[.8rem] mr-2">
                {formik.errors.nationalCode}
              </div>
            )}
          </div>
        </div>
        {/* postal code */}
        <div
          className={`w-full border md:px-3 border-r-0 border-l-0 border-t-0 border-b-1 border-solid border-[gray]`}
        >
          <div className="mt-5 flex flex-col  md:flex-row md:w-[60%] justify-between items-start mb-1  pb-4">
            <label htmlFor="lastname">کد پستی</label>
            <input
              placeholder="کد پستی"
              type="text"
              id="postalCode"
              className="w-full max-w-[93vw] md:w-[350px] md:mr-auto md:ml-0 mx-auto mt-1 p-2 text-right text-[.95rem] pr-3 rounded-md text-[gray] focus:outline-none border border-solid border-[gray]"
              onChange={formik.handleChange}
              value={formik.values.postalCode}
            />
            {formik.errors.postalCode && (
              <div className="text-red-500 text-right w-full text-[.8rem] mr-2">
                {formik.errors.postalCode}
              </div>
            )}
          </div>
        </div>
        <div className="w-full border md:px-3 border-r-0 border-l-0 border-t-0 border-b-1 border-solid border-[gray]">
          <div className="mt-5 flex flex-col  md:flex-row md:w-[60%] justify-between items-start mb-1  pb-4">
            <label>استان </label>
            <div className="flex flex-col items-end w-full">
              <input
                type="text"
                id="city"
                placeholder="استان"
                className="w-full max-w-[93vw] md:w-[350px] md:mr-auto md:ml-0 mx-auto mt-1 p-2 text-right text-[.95rem] pr-3 rounded-md text-[gray] focus:outline-none border border-solid border-[gray]"
                onChange={formik.handleChange}
                value={formik.values.city}
              />
              {formik.errors.city && (
                <div className="text-red-500 text-right w-full text-[.8rem] mr-2">
                  {formik.errors.city}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full my-4 pb-4 border md:px-3 border-r-0 border-l-0 border-t-0 border-b-1 border-solid border-[gray]">
          <div>
            <label>آدرس</label>
            <div className="flex flex-col items-end ص-بعمم">
              <textarea
                type="text"
                id="address"
                placeholder="ادرس"
                className="w-full max-w-[93vw] md:w-[350px] md:mr-auto md:ml-0 mx-auto mt-1 p-2 text-right text-[.95rem] pr-3 rounded-md text-[gray] focus:outline-none border border-solid border-[gray]"
                onChange={formik.handleChange}
                value={formik.values.address}
              />
              {formik.errors.address && (
                <div className="text-red-500 text-right w-full text-[.8rem] mr-2">
                  {formik.errors.address}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
      <div
        className={`max-w-[95vw] mx-auto w-full flex justify-end items-center my-2`}
      >
        <button onClick={LogoutHandler} className="bg-[red] text-[white] rounded-md hover:rounded hover:bg-[#ff4040] transition-all text-[.9rem] py-1 px-2">
          خروج از حساب کاربری
        </button>
      </div>
    </Layout>
  );
}

index.auth = true;

export default index;
