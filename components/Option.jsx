import React from "react";

function Option({ src, title, desc }) {
  return (
    <div className="flex items-center justify-start gap-2 ">
      <div className="bg-[rgba(110,129,180,.16)] p-[1.2rem] md:p-[.8rem] rounded-lg grid place-items-center">
        <img src={src} alt={src} className="h-[60px]" />
      </div>
      <div className="mr-4 ">
        <h4 className="text-[white] mb-3 font-black text-[1.2rem] md:text-[1rem]">
          {title}
        </h4>
        <p className="max-w-[200px] text-[.8rem] md:text-[.6rem] font-normal text-[hsla(0,0%,100%,.48)]">
          {desc}
        </p>
      </div>
    </div>
  );
}

export default Option;
