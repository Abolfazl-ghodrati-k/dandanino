import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Nav from "./Nav";
import Footer from "./Footer";

function Layout({ title, children, home }) {
  const [LandNav, setLandNav] = useState(true);
  const [mainH, setmainH] = useState();
  const [loading, setloading] = useState(true);
  const header = useRef();
  const main = useRef();
  const footer = useRef();

  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== "/" && router.pathname !=="/contact-us" ) {
      setLandNav((ln) => (ln = false));
      // let mainH = 100 - ((footer.current.clientHeight)*100/ document.body.clientHeight)
      let mainH = document.body.clientHeight - footer.current.clientHeight;
      setmainH((mh) => (mh = mainH));
    }

    return () => setloading(false);
  }, [router.pathname, mainH]);

  return (
    <>
      <Head>
        <title>{title ? title : "دندانینو"}</title>
        <meta name="description" content="home page" />
      </Head>
      {/* <Scrollbar> */}
      <div
        className={`flex  ${
          LandNav ? "" : ""
        }  flex-col justify-between mx-auto overflow-y-scroll overflow-x-hidden min-h-screen max-h-screen h-full scrollbar`}
      >
          <header
            className={`fixed z-10 max-h-[150px] ${
              LandNav
                ? "rounded-md top-[.5rem] w-[95vw] left-[2.5%] right-[2.5%] sm:w-[97vw] sm:left-[1.5%] sm:right-[1.5%] nav-bg"
                : "w-full top-0 p-2 bg-white"
            } flex items-center `}
          >
            <Nav />
          </header>
        <main
          className={` ${
            LandNav ? "" : "bg-[#ecf0f3] min-h-[80vh] h-full"
          }`}
        >
          <div className={`${LandNav ? "mt-[4rem]" : "mt-[5rem] bg-[#ecf0f3]"}`}>
            {children}
          </div>
        </main>
        <footer
          ref={footer}
          className={`${LandNav ? "" : "fixed bottom-0 left-0 right-0"}`}
        >
          <Footer />
        </footer>
      </div>
      {/* </Scrollbar> */}
    </>
  );
}

export default Layout;
