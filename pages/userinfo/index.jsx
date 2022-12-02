import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

function index() {
  const router = useRouter()

  const submitHandler = (
    e
  ) => {
    e.preventDefault()
    const error = false
    console.log('im')
    if(!error) {
      router.push(router.query.redirect)
    }
  };

  

  useEffect(() => {
    console.log(router,"redirect")
  })

  return (
    <Layout>
      <form
        onSubmit={e => submitHandler(e)}
        className="max-w-[95vw] mx-auto flex flex-col"
      >
        {/* titlle */}
        <div className="flex fixed top-[5.3rem] bg-[#ecf0f3] left-[2.5vw] right-[2.5vw] justify-between items-center border border-r-0 border-l-0 border-t-0 border-b-1 border-solid border-[gray] pb-3">
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
            <button className="transition-all mb-1 p-[.4rem] text-[.9rem] sm:w-[100px] sm:mr-2 rounded border border-[gray] border-solid hover:border-[#a59f9f]">
              بستن
            </button>
          </div>
        </div>
        {/* name */}
        <div className="flex mt-[6rem] md:mt-[4.6rem] md:px-3 flex-col md:flex-row items-between justify-start md:justify-between py-3 border border-r-0 border-l-0 border-t-0 border-b-1 border-solid border-[gray]">
          <div className="flex flex-col md:flex-row justify-center items-start md:items-center md:justify-between md:w-[60%]">
            <label htmlFor="firstname" className="ml-3 flex items-start">
              نام
            </label>
            <input
              type="text"
              placeholder="نام"
              className="w-full max-w-[93vw] md:max-w-[350px] md:mr-auto md:ml-0 mx-auto mt-1 p-2 text-right text-[.95rem] pr-3 rounded-md text-[gray] focus:outline-none border border-solid border-[gray]"
            />
          </div>
          <div className="mt-5 md:mt-0 flex flex-col justify-between items-start mb-1 md:w-[40%] md:mb-0">
            <label htmlFor="lastname" className="md:hidden">
              نام خانوادگی
            </label>
            <input
              placeholder="نام خانوادگی"
              type="text"
              className="w-full  max-w-[93vw]  md:max-w-[350px] md:ml-auto md:mr-[3rem] mx-auto mt-1 p-2 text-right text-[.95rem] pr-3 rounded-md text-[gray] focus:outline-none border border-solid border-[gray]"
            />
          </div>
        </div>
        {/* code melli */}
        <div className="w-full md:px-3 border border-r-0 border-l-0 border-t-0 border-b-1 border-solid border-[gray]">
          <div className="mt-5 flex flex-col md:flex-row md:w-[60%] justify-between items-start mb-1  pb-4">
            <label htmlFor="kodemelli">کد ملی</label>
            <input
              placeholder="کد ملی"
              type="text"
              className="w-full max-w-[93vw] md:w-[350px] md:mr-auto md:ml-0 mx-auto mt-1 p-2 text-right text-[.95rem] pr-3 rounded-md text-[gray] focus:outline-none border border-solid border-[gray]"
            />
          </div>
        </div>
        {/* postal code */}
        <div className="w-full border md:px-3 border-r-0 border-l-0 border-t-0 border-b-1 border-solid border-[gray]">
          <div className="mt-5 flex flex-col  md:flex-row md:w-[60%] justify-between items-start mb-1  pb-4">
            <label htmlFor="lastname">کد پستی</label>
            <input
              placeholder="کد پستی"
              type="text"
              className="w-full max-w-[93vw] md:w-[350px] md:mr-auto md:ml-0 mx-auto mt-1 p-2 text-right text-[.95rem] pr-3 rounded-md text-[gray] focus:outline-none border border-solid border-[gray]"
            />
          </div>
        </div>
        {/* email */}
        <div className="w-full md:px-3 border border-r-0 border-l-0 border-t-0 border-b-1 border-solid border-[gray]">
          <div className="mt-5 flex flex-col  md:flex-row md:w-[60%] justify-between items-start mb-1  pb-4">
            <label htmlFor="lastname">تلفن ثابت</label>
            <input
              placeholder="تلفن ثابت"
              type="text"
              className="w-full max-w-[93vw] md:w-[350px] md:mr-auto md:ml-0 mx-auto mt-1 p-2 text-right text-[.95rem] pr-3 rounded-md text-[gray] focus:outline-none border border-solid border-[gray]"
            />
          </div>
        </div>
        {/* email */}
        <div className="w-full md:px-3 border border-r-0 border-l-0 border-t-0 border-b-1 border-solid border-[gray]">
          <div className="mt-5 flex flex-col  md:flex-row md:w-[60%] justify-between items-start mb-1  pb-4">
            <label htmlFor="lastname">ایمیل</label>
            <input
              placeholder="ایمیل"
              type="text"
              className="w-full max-w-[93vw] md:w-[350px] md:mr-auto md:ml-0 mx-auto mt-1 p-2 text-right text-[.95rem] pr-3 rounded-md text-[gray] focus:outline-none border border-solid border-[gray]"
            />
          </div>
        </div>
        {/* address modal */}
        <div className="mt-5 flex md:px-3  justify-between items-start mb-1 pb-4">
          <p>آدرس</p>
          <button className="ml-5 hover:bg-[#41cbc6] transition-all p-2 rounded-md">
            + افزودن
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default index;
