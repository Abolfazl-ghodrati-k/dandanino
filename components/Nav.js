import React, { Profiler, useContext } from "react";
import Image from "next/dist/client/image";
import Logo_dark from "../public/Images/Logos/logo-dark.svg";
import Link from "next/link";
import { HiOutlineShoppingBag, HiOutlineMenu } from "react-icons/hi";
import { Menu } from "@headlessui/react";
import DropdownLink from "./DropdownLink";
import { Store } from "../utils/Store";
import { products } from "../utils/data";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

function Nav({ onLand }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const { data: session } = useSession();
  const router = useRouter();

  const Profiler = () => {
    if (session?.user && !session?.user?.email) {
      router.push("/userinfo");
    } else if (session?.user?.email) {
      router.push("/admin/dashboard");
    } else {
      router.push({
        pathname: "/profile",
        query: { redirect: router.pathname },
      });
    }
  };

  if (router.pathname) {
    return (
      <div className="flex px-[2rem] sm:px-[5rem] justify-between items-center w-full mx-auto p-2">
        <Menu as="div" className="relative inline-block sm:hidden text-right">
          <Menu.Button className="mt-1">
            <HiOutlineMenu size={30} />
          </Menu.Button>
          <Menu.Items className="absolute  text-right -right-8 w-[95vw] top-12 z-10 origin-top-right rounded-lg p-1 bg-[white] mt-2 shadow-lg">
            {/* <Menu.Item>
              <DropdownLink className="dropdown-link" href="/products">
                <span className="w-full">محصولات</span>
              </DropdownLink> */}
            {/* </Menu.Item> */}
            <Menu.Item>
              <DropdownLink className="dropdown-link" href="/contact-us">
                <span className="w-full"> تماس با ما</span>
              </DropdownLink>
            </Menu.Item>
            <Menu.Item>
              <DropdownLink className="dropdown-link">
                <span
                  className="w-full"
                  onClick={() => {
                    Profiler();
                  }}
                >
                  {" "}
                  حساب کاربری
                </span>
              </DropdownLink>
            </Menu.Item>
          </Menu.Items>
        </Menu>
        <div className="w-[120px] ms:w-auto">
          <Link href={"/"}>
              <Image src={Logo_dark} alt="logo" width={150} height={200} />
          </Link>
        </div>
        <div className=" hidden sm:flex ml-auto mr-3 text-[.85rem] ms:mr-[3rem]">
          <ul className="flex flex-row-reverse items-center justify-start [&>*]:ml-2 sm:[&>*]:ml-6">
            {/* <li className="hover:text-[#167495] text-[black] transition-all">
              <Link href={"/products"}>محصولات</Link>
            </li> */}
            <li className="hover:text-[#4fa6c5] text-[black] transition-all">
              <Link href={"/contact-us"}>تماس با ما</Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-between items-center">
          <span className=" hidden sm:flex">
            <span
              onClick={() => Profiler()}
              className="flex mt-1 flex-col items-center ml-2 hover:text-[#4fa6c5] text-[black] group transition-all duration-5000 cursor-pointer"
            >
              <p className="mb-1 text-[.6rem] ms:text-[.7rem] md:text-[.9rem]">
                حساب کاربری
              </p>
              <div className="mx-auto h-[1px] bg-[black] w-[0] group-hover:w-full transition-width duration-500"></div>
            </span>
          </span>
          <Link href={"/cart"}>
            <span className="hover:text-[#167495] cursor-pointer text-[black] transition-all duration-300 flex relative">
              <HiOutlineShoppingBag size={30} />
              {cart.cartItems.length > 0 && (
                <span className="absolute -right-[.75rem] rounded-full p-1 px-2 -top-2 bg-[black] text-[white] text-[.6rem]">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </span>
              )}
            </span>
          </Link>
        </div>
      </div>
    );
  }
}

export default dynamic(() => Promise.resolve(Nav), { ssr: false });
