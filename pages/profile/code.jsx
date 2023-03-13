import routerr, { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Store } from "../../utils/Store";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";

function Code() {
  const [loading, setloading] = useState(false);
  const [Code, setCode] = useState("");
  const [trueCode, settrueCode] = useState("");
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { data: session } = useSession();

  const getCode = async () => {
    setloading(true);
    await sleep(1000);
    setloading(false);
    return 12345;
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    // console.log(session)
    if (session?.user) {
      router.push({ pathname: router.query.redirect || "/" });
    } else {
      if (state.user) {
        getCode().then((res) => settrueCode((code) => (code = res)));
      } else {
        router.push("/profile");
      }
    }
  }, []);

  const SignUP = async () => {
    var {data:{user}} = await axios.post("/api/auth/signup", {
      username: state.user,
    });
    return user
  };

  const checkCode = async () => {
    if (Code == trueCode) {
      // console.log(first)
      setloading((loading) => (loading = true));
      const user = await SignUP();
      setloading((loading) => (loading = false));
      if (user && !user?.isAdmin) {
        console.log(user)
        try {
          const result = await signIn("credentials", {
            redirect: true,
            username: user.username,
            callbackUrl: router.query.redirect || "/",
          });
          toast.success('با موفقیت وارد شدید')
          setloading((loading) => (loading = false));
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return (
    <div className="w-full mx-auto md:max-w-[60%] min-h-screen flex flex-col items-center justify-start">
      <h1 className="text-center w-full text-[2.5rem] font-bold mt-2">
        موبایل خود را چک کنید
      </h1>
      <p className="text-center font-medium w-full my-2">
        ما کد تایید را به موبایل شما ارسال کردیم
      </p>
      <p className="text-[gray] font-bold my-2">
        لطفا کد دریافتی را وارد نمایید
      </p>
      <input
        value={Code}
        onChange={(e) => setCode((cod) => (cod = e.target.value))}
        type="text"
        className="w-full md:max-w-[40%] p-2 text-center text-[.95rem] pr-3 rounded-md text-[gray] focus:outline-none border border-solid border-[gray]"
      />
      {loading ? (
        <button
          onClick={() => checkCode()}
          className="flex mt-4 w-full md:max-w-[40%] justify-center items-center bg-[#41cbc6] rounded-md py-2 text-white cursor-pointer"
        >
          <span className="mx-1">لطفا صبر کنید ...</span>
        </button>
      ) : (
        <button
          onClick={() => checkCode()}
          className="flex mt-4 w-full md:max-w-[40%] justify-center items-center bg-[#41cbc6] rounded-md py-2 text-white cursor-pointer"
        >
          <span className="mx-1">ادامه</span> <BiArrowBack size={15} />
        </button>
      )}
    </div>
  );
}

export default Code;
