import React from "react";
import Image from "next/image";
import banner from "../../public/Images/banner.jpeg";
import { HiOutlineShoppingBag, HiOutlineMenu } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { CiDeliveryTruck } from "react-icons/ci"
import Hero from "../../components/Hero";

export default function Landing() {
  return (
    <div className="w-full">
      <Hero />
    </div>
  );
}
