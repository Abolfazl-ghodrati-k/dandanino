import React, { useContext, useState } from "react";
import { Store } from "../../utils/Store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

function Login() {
  const { state, disatch } = useContext(Store);
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const router = useRouter();
  const { data } = useSession();
  console.log(data);

  const submitPassword = async () => {
    // console.log(state.user)
    if (password) {
      const result = await signIn("credentials", {
        redirect: false,
        username: state.user.username,
        password: password,
        // callbackUrl: router.query.redirect || "/admin/dashboard",
      });
      if (result.error) {
        result.error == "no user found sign up"
          ? router.push("/profile")
          : seterror(true);
      } else {
        router.push("/admin/dashboard");
        // console.log(result)
      }
    }
  };

  useEffect(() => {});
  return (
    <div
    className="min-w-screen min-h-screen pb-[5rem] flex items-center justify-center "
      style={{
        backgroundImage: `url("https://fastly.picsum.photos/id/1025/2000/1000.jpg?hmac=908ZFWec0aZdO35sTZiAA6UhZuIiKNkXQ581ZDd7AeU")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition:"50% 50%"
      }}
    >
      <div className="flex flex-col  items-center justify-center py-3 cart md:max-w-[450px] mx-2 md:mx-auto px-5 ">
        <h1 className="">لطفا رمز عبور را وارد نمایید</h1>
        <div className="flex flex-col items-end">
          <input
            type="text"
            className="mt-3 w-[200px] focus:outline-none text-[.9rem]"
            value={password}
            placeholder="رمز عبور"
            onChange={(e) => {
              setpassword(e.target.value);
              seterror(false);
            }}
          />
          {error && (
            <div className="text-rose-500 text-[.8rem] text-right">
              رمز عبور صحیح نمیباشد
            </div>
          )}
          <button
            className="bg-[#f5899b] rounded py-2 px-3 hover:bg-[pink] mt-3"
            onClick={submitPassword}
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
