import React from "react";
import Layout from "../../components/Layout";
import Image from "next/image";
import PersianNumber from "react-persian-currency/lib/PersianNumber";
import { BiPhone } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { MdAlternateEmail } from "react-icons/md";

export default function ContactUs() {
  return (
    <Layout>
      <div className=" h-full w-full">
        <div className="w-full grid place-items-center">
          <Image src="/Images/map.svg" width={800} height={500} />
        </div>
        <div className="flex flex-col items-center text-right gap-[15px] w-[60%] max-w-[800px] my-5 border border-red-900  mx-auto">
          <h1 className="text-right ml-auto mt-3 mr-2">تماس با ما</h1>
          <div className="w-full h-[1px] bg-[black]"></div>
          <div className="grid grid-cols-3 [&>*]:col-span-1 [&>*]:min-h-[200px]">
            <div className="flex flex-col items-center justify-senter">
              <div className="mb-5 bg-[#548bce] p-2 rounded-md">
                <BiPhone size={50} color="white" />
              </div>
              <p>شماره تماس ما</p>
              <p className="text-[1.2rem] mt-5">
                <PersianNumber>021-77123334</PersianNumber>
              </p>
            </div>
            <div className="flex flex-col items-center justify-senter">
              <div className="mb-5 bg-[#548bce] p-2 rounded-md">
                <GoLocation size={50} color="white" />
              </div>
              <h1>آدرس ما</h1>
              <p className="mt-5 text-[1.1rem] max-w-[300px]">
                تهران، سید خندان دم دانشگاه وایسادم
              </p>
            </div>
            <div className="flex flex-col items-center justify-senter">
              <div className="mb-5 bg-[#548bce] p-2 rounded-md">
                <MdAlternateEmail size={50} color="white" />
              </div>
              <p>آدرس ایمیل ما</p>
              <p className="mt-5 text-[1.1rem]">abgkcode@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
