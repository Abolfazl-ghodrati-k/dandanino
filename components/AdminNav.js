import React from "react";
import Link from "next/link";
import {AiOutlineFullscreenExit} from 'react-icons/ai'


function AdminNav({setShowHeader}) {
  return (
    <div>
      <div className="text-[1.3rem] font-bold mb-5 flex justify-between items-center">
        <p>دندانینو</p>
        <div className="md:hidden" onClick={()=> setShowHeader(false)}><AiOutlineFullscreenExit size={25} /></div>
      </div>
      <ul>
        <li className="text-[#A4AAB5] text-[1.2rem]">داشبورد</li>
        <li>
          <Link href="/admin/dashboard">
            <span className="font-bold">فروشگاه</span>
          </Link>
        </li>
        <li className="text-[#A4AAB5] text-[1.2rem]">صفحات</li>
        <li>
          <Link href="/admin/orders">سفارشات</Link>
        </li>
        {/* <li>
              <Link href="/admin/products">Products</Link>
            </li> */}
        <li>
          <Link href="/admin/users">کاربرام</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminNav;
