import React from "react";

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap">
      {["ثبت نام", "ثبت آدرس", " انتخاب نحوه پرداخت ", "بازبینی و ثبت"].map(
        (step, index) => (
          <div
            key={step}
            className={` flex w-[25%] justify-center border-b-2 items-center py-auto  
          text-center text-[.8rem] ${(index == 2 || index == 3)? "text-[.6rem]": ""}
       ${
         index <= activeStep
           ? "border-[black]   text-[black]"
           : "border-gray-400 text-gray-400"
       }
       `}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
