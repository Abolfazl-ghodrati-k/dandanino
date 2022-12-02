import Router, { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Store } from "../../utils/Store";
import { signIn, signOut, useSession } from "next-auth/react";
import { set } from "mongoose";

function code() {
  const [loading, setloading] = useState(false);
  const [Code, setCode] = useState("");
  const [trueCode, settrueCode] = useState("");
  const route = useRouter();
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
    console.log(session)
    if (session?.user) {
      route.push({ pathname: route.query.redirect || "/" });
    } else {
      if (state.user) {
        getCode().then((res) => settrueCode((code) => (code = res)));
      } else {
        route.push("/profile");
      }
    }
  }, []);

  const SignUP = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: state.user }),
    };
    var user;
    await fetch("http://localhost:3000/api/auth/signup", options)
      .then((res) => res.json())
      .then((data) => {
        user = data;
      })
      .catch((err) => console.log(err));
    return user;
  };

  const checkCode = async () => {
    console.log(trueCode);
    console.log(JSON.stringify(state.user));
    if (Code == trueCode) {
      // console.log(first)
      setloading(loading => loading = true)
      const user = await SignUP();
      // console.log(user);
      if (user) {
        try {
          const result = await signIn("credentials", {
            redirect: true,
            username: state.user,
            callbackUrl: route.query.redirect || '/'
          });
          // console.log(result,'result')
          setloading(loading => loading = false)
        } catch (error) {
          console.log(error);
        }
      }
      // route.push({ pathname: route.query.redirect || "/" });
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

export default code;
