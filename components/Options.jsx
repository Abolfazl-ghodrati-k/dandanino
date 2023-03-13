import React from "react";
import Option from "./Option";

function Options() {
  return (
    <div className="flex flex-col justify-between items-start [&>*]:mb-[2rem] md:[&>*]:mb-[0px] p-[2rem] md:flex-row md:justify-between md:items-center md:p-[4.5rem] ml:mt-[4rem] bg-gradient-to-r to-[#333939] from-[#58605f]">
      <Option
        src={"/Images/europe.svg"}
        title={"دارای تاییدیه اتحادیه اروپا"}
        desc={
          "همه محصولات دندانینو مطابق با استانداردهای اتحادیه اروپا طراحی شده است."
        }
      />
      <Option
        src={"/Images/guarantee.svg"}
        title={"یک سال گارانتی"}
        desc={
          "به منظور اطمینان بیشتر شما، همه محصولات دارای خدمات ۱ ساله تعمیر و تعویض هستند."
        }
      />
      <Option
        src={"/Images/return.svg"}
        title={"بازگشت کالا تا ۷ روز"}
        desc={
          "تا ۷ روز پس از خرید می توانید محصول را بازگشت دهید."
        }
      />
    </div>
  );
}

export default Options;
