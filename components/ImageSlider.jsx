import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

function ImageSlider({ Images, width, height, ActiveNumb, setActiveNumb }) {
  const [Active, setActive] = useState(Images[0]);

  useEffect(() => {
    Images.map((Image, index) => {
      if (Image == Active.image) {
        setActiveNumb(index);
      }
    });
  }, [Images]);

  const IncreaseNumb = () => {
    if (ActiveNumb == Image.length) {
      setActive(Images[0]);
      setActiveNumb(0);
    } else {
      setActive(Images[ActiveNumb + 1]);
      setActiveNumb(ActiveNumb + 1);
    }
  };

  const DecreaseNumb = () => {
    if (ActiveNumb == 0) {
      let last = Images.length - 1;
      setActive(Images[last]);
      setActiveNumb(Images.length - 1);
    } else {
      setActive(Images[ActiveNumb - 1]);
      setActiveNumb(ActiveNumb - 1);
    }
  };

  return (
    <>
      <div className="flex items-center justify-start">
        <div
          className="rounded-full text-[1.1rem] bg-[gray] hover:bg-[#494848] p-2 cursor-pointer"
          onClick={() => {
            IncreaseNumb();
          }}
        >
          {"<"}
        </div>
        <div>
          <Image
            width={width}
            height={height}
            alt="water jet"
            src={Active.image}
          />
        </div>
        <div
          className="rounded-full text-[1.1rem] bg-[gray] hover:bg-[#494848] p-2 cursor-pointer"
          onClick={() => {
            DecreaseNumb();
          }}
        >
          {">"}
        </div>
      </div>
      <div className="flex w-full items-center justify-center gap-2">
        {Images.map((Image, index) => {
          return (
            <div
              onClick={() => {
                setActive(Image);
                setActiveNumb(index);
              }}
              className={`cursor-pointer border rounded-full border-solid w-[20px] h-[20px] ${
                index == ActiveNumb ? "bg-[black]" : "bg-[#b2b2b2]"
              }`}
            ></div>
          );
        })}
      </div>
    </>
  );
}

export default ImageSlider;
