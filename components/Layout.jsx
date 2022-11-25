import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Nav from "./Nav";
import Footer from "./Footer";

function Layout({ title, children, home }) {
  const [LandNav, setLandNav] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== "/") {
      setLandNav((ln) => (ln = false));
    }
  });
  return (
    <>
      <Head>
        <title>{title ? title : "دندانینو"}</title>
        <meta name="description" content="home page" />
        <link rel="preconnect" href="//fdn.fontcdn.ir" />
        <link rel="preconnect" href="//v1.fontapi.ir" />
        <link href="https://v1.fontapi.ir/css/Vazir" rel="stylesheet"></link>
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <div
          className={`fixed z-10 ${
            LandNav
              ? "rounded-md w-[95vw] left-[2.5%] right-[2.5%] sm:w-[97vw] sm:left-[1.5%] sm:right-[1.5%] nav-bg"
              : "w-full nav-bg top-0 p-2"
          } flex items-center top-[.5rem]`}
        >
          <Nav />
        </div>
        <main className="bg-no-repeat sm:bg-hero">
          <div className="mt-[4rem]">{children}</div>
        </main>
        <footer className="pt-1 border border-t-1 border-l-0 border-r-0 border-b-0 border-zinc-600 border-solid ">
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default Layout;
