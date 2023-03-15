import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

function AdminInfo({ setShowHeader }) {
  const { data: session } = useSession();
  const [ShowMenu, setShowMenu] = useState(false);

  const Signout = async () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="w-full flex justify-between items-center mb-32">
      <div
        className="cursor-pointer"
        onClick={() =>
          setShowHeader((showHeader) => (showHeader = !showHeader))
        }
      >
        <AiOutlineMenu size={25} />
      </div>
      <div className="flex flex-col items-center justify-start">
        <div
          onClick={() => setShowMenu(!ShowMenu)}
          className="flex justify-start gap-4 items-start rounded-md p-2 hover:bg-slate-200
           transition-all cursor-pointer"
        >
          {session.user.name}
          {/* {session.user.image ? (
            <Image />
          ) : ( */}
            <div className="mt-1">
              <AiOutlineUser size={20} />
            </div>
          {/* )} */}
        </div>
        {ShowMenu && (
          <div className="bg-slate-300 rounded text-[.9rem] mt-1 p-2 py-4">
            <span
              onClick={Signout}
              className="py-2 px-3 cursor-pointer rounded hover:bg-[white] transition"
            >
              خروج از حساب کاربری
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminInfo;
