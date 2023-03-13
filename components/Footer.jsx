import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  const router = useRouter()
  return (
    <div className="w-full bg-[#1b2842] text-[white] flex justify-around items-center p-2">
      <Image src={"/Images/Logos/logo.png"} width={100} height={50} onClick={() => router.push('/')} />
      <div className="flex justify-between items-center gap-[15px]">
        <div className="cursor-pointer hover:text-[#b3b3b3] transition-all">
          <AiOutlineInstagram size={25} />
        </div>
        <div className="cursor-pointer hover:text-[#b3b3b3] transition-all">
          <FaLinkedinIn size={25} />
        </div>
      </div>
      <div className="text-[.8rem] text-[#b3b3b3]">&#169; Dandanino 2023 </div>
    </div>
  );
}

export default Footer;
