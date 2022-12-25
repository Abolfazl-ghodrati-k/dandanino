import Image from "next/image";
import logo from "../../public/Images/Logos/logo.png";
import React, { useContext, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";
import { Store } from "../../utils/Store";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Login() {
  const [error, seterror] = useState(false);
  const [username, setusername] = useState("");
  const [Loading, setLoading] = useState(false);
  const [code, setcode] = useState(12345);

  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { data: session } = useSession();

  const pattern = /^[0-9]{11}$/;

  useEffect(() => {
    if (session?.user && !session?.user?.isAdmin) {
      router.push("/userinfo");
    }
    if(session?.user?.isAdmin) {
      router.push("/admin/dashboard")
    }
  }, []);

  const SigningUp = () => {
    dispatch({ type: "ADD_USERNAME", payload: username });
    router.push({
      pathname: "/profile/code",
      query: { redirect: router.query.redirect || "/" },
    });
  };

  const AdminLogin = (user) => {
    dispatch({ type: "ADD_USERNAME", payload: user });
    router.push({
      pathname: "/admin/login",
    });
  };

  const checkUser = async () => {
    const {
      data,
    } = await axios.post("/api/auth/user", {
       username,
    });
    // console.log(data)
    return data;
  };

  const getcode = async () => {
    const valid = pattern.test(username);
    if (valid) {
      setLoading((loading) => (loading = true));
    } else {
      seterror((err) => (err = true));
      return;
    }
    var user = await checkUser();
    // console.log(user);
    if (user?.isAdmin) {
      AdminLogin(user);
    } else {
      SigningUp();
    }
    // console.log(user);
    setLoading((loading) => (loading = false));
  };

  return (
    <div className="mt-[3rem] flex flex-col items-center justify-start mx-auto h-full my-auto">
      <div className="bg-[black] w-full flex justify-center items-center">
        <Image src={logo} alt="لوگو" width={200} height={200} />
      </div>
      <div className="text-center w-full mt-5">
        <h1 className="text-[1.9rem] font-bold">به دندانینو خوش آمدید</h1>
        <p className="text-[#6D768A] tracking-tighter">
          خوش آمدید! لطفا مشخصات خود را وارد کنید
        </p>
        <div className="text-right mt-3 px-3 font-medium">
          <label htmlFor="phonenumber" className="mr-1 mb-3">
            شماره موبایل
          </label>
          <input
            type="text"
            className="w-full p-2 text-right text-[.95rem] pr-3 rounded-md text-[gray] focus:outline-none border border-solid border-[gray]"
            placeholder={"09123456789"}
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
              seterror((err) => (err = false));
            }}
          />
          {error && (
            <small className="text-red-400 text-[.8rem] font-semibold mr-2">
              ریدی دایی جان
            </small>
          )}
        </div>
        <div className="flex flex-col items-center [&>*]:w-full w-full text-center mt-7 px-3">
          <button
            onClick={() => getcode()}
            className="flex w-full justify-center items-center bg-[#41cbc6] rounded-md py-2 text-white cursor-pointer"
          >
            {Loading ? (
              <span className="mx-1">لطفا صبر کنید ...</span>
            ) : (
              <>
                <span className="mx-1">ادامه</span> <BiArrowBack size={15} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
