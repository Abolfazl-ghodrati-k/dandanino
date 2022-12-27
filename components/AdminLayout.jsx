import Head from "next/head";
import React, { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import AdminInfo from "./AdminInfo";

function AdminLayout({ title, children }) {
  const [ShowHeader, setShowHeader] = useState(true);
  const [MobileNav, setMobileNav] = useState(false);
  // useEffect(() => {
  //   let width = document.body.clientWidth;
  //   if (width < 800) {
  //     setShowHeader(false)
  //   }
  // }, []);
  return (
    <div className="grid md:grid-cols-5 md:gap-5 bg-[#f7ffff]">
      <Head>
        <title>{title ? title : "دندانینو"}</title>
        <meta name="description" content="home page" />
        <link rel="preconnect" href="//fdn.fontcdn.ir" />
        <link rel="preconnect" href="//v1.fontapi.ir" />
        <link href="https://v1.fontapi.ir/css/Vazir" rel="stylesheet"></link>
      </Head>
        <header
          className={`bg-[#fbfbfb] rounded-l-lg rounded-bl-lg h-full  p-4 
          ${ShowHeader ? '': 'hidden'}
          md:row-start-1 md:row-end-3 absolute w-[200px] md:w-auto md:relative`}
        >
          <AdminNav setShowHeader={setShowHeader}/>
        </header>
      <main
        className={`${ShowHeader? 'col-span-5 md:col-span-4' : 'col-span-5'} p-4`}
      >
        <AdminInfo ShowHeader={ShowHeader} setShowHeader={setShowHeader} />
        {children}
      </main>
      <footer className="col-start-5 row-start-2">
        تمام حقوق محفوظ است &#169;
      </footer>
    </div>
  );
}

export default AdminLayout;
