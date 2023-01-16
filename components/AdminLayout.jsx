import Head from "next/head";
import React, { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import AdminInfo from "./AdminInfo";

function AdminLayout({ title, children }) {
  const [ShowHeader, setShowHeader] = useState(true);
  const [Height, setHeight] = useState(0);
  useEffect(() => {
    let height = document.body;
    console.log(height)
    setHeight((Height) => (Height = height));
  }, []);
  return (
    <div
      className={`grid md:grid-cols-5 md:gap-5 bg-[#f7ffff] relative min-h-[1000px]`}
    >
      <Head>
        <title>{title ? title : "دندانینو"}</title>
        <meta name="description" content="home page" />
        <link rel="preconnect" href="//fdn.fontcdn.ir" />
        <link rel="preconnect" href="//v1.fontapi.ir" />
        <link href="https://v1.fontapi.ir/css/Vazir" rel="stylesheet"></link>
      </Head>
      <header
        className={`bg-[#fbfbfb] rounded-l-lg rounded-bl-lg p-4 
          ${ShowHeader ? "" : "hidden"}
          md:row-start-1 md:row-end-3 absolute top-0 right-0 bottom-0 z-50 h-full w-[200px] md:w-auto md:relative`}
      >
        <AdminNav setShowHeader={setShowHeader} />
      </header>
      <main
        className={`${
          ShowHeader
            ? "col-span-5 md:col-span-4 absolute top-0 right-0 left-0 z-0 md:relative"
            : "col-span-5"
        } p-4`}
      >
        <AdminInfo ShowHeader={ShowHeader} setShowHeader={setShowHeader} />
        {children}
      </main>
      <footer className="col-start-5 row-start-2 absolute bottom-0">
        تمام حقوق محفوظ است &#169;
      </footer>
    </div>
  );
}

export default AdminLayout;
