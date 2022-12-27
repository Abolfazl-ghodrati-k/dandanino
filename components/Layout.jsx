import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Nav from "./Nav";
import Footer from "./Footer";

function Layout({ title, children, home }) {
  const [LandNav, setLandNav] = useState(true);
  const [mainH, setmainH] = useState();
  const header = useRef();
  const main = useRef();
  const footer = useRef();

  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== "/") {
      setLandNav((ln) => (ln = false));
      // let mainH = 100 - ((footer.current.clientHeight)*100/ document.body.clientHeight)
      let mainH = document.body.clientHeight - footer.current.clientHeight;
      setmainH((mh) => (mh = mainH));
    }
  }, [router.pathname, mainH]);
  return (
    <>
      <Head>
        <title>{title ? title : "دندانینو"}</title>
        <meta name="description" content="home page" />
        <link rel="preconnect" href="//fdn.fontcdn.ir" />
        <link rel="preconnect" href="//v1.fontapi.ir" />
        <link href="https://v1.fontapi.ir/css/Vazir" rel="stylesheet"></link>
      </Head>
      <div
        className={`flex ${
          LandNav ? "" : "max-h-screen"
        } min-h-screen flex-col justify-between max-w-[1400px] overflow-x-hidden overflow-y-hidden mx-auto`}
      >
        <header
          className={`fixed z-10 ${
            LandNav
              ? "rounded-md top-[.5rem] w-[95vw] left-[2.5%] right-[2.5%] sm:w-[97vw] sm:left-[1.5%] sm:right-[1.5%] nav-bg"
              : "w-full top-0 p-2 bg-white"
          } flex items-center `}
        >
          <Nav />
        </header>
        <main
          className={`bg-no-repeat sm:bg-hero overflow-y-scroll  ${
            LandNav ? "" : "bg-[#ecf0f3]"
          }`}
          style={{ minHeight: mainH + "px" }}
        >
          <div className={`${LandNav ? "mt-[4rem]" : "mt-[5rem]"}`}>
            {children}
          </div>
        </main>
        <footer
          ref={footer}
          className={`pt-1 border border-t-1 border-l-0 border-r-0 border-b-0 border-zinc-600 border-solid ${
            LandNav ? "" : "bg-[#F9FAFB]"
          }`}
        >
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default Layout;
