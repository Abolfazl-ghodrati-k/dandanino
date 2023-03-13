import React from "react";
import comments from "../mock/comments";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Controller,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/controller";

function Comments() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      grabCursor={true}
      modules={[Navigation, Scrollbar, A11y, Controller, Autoplay]}
    >
      {comments.map((item) => (
        <SwiperSlide>
          <div key={item} className="flex flex-col items-center justify-between min-h-[233px] gap-[10px] ">
            <h1 className="font-black text-[1.4rem] max-w-[80%] text-center mb-[25px]">
              {item.comment}
            </h1>
            <img src={item.icon} alt="icon" className="max-w-[65px]" />
            <p>{item.name}</p>
            <small className="text-[#b9b9b9]">{item.position}</small>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Comments;
