import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout title="Unauthorized Page">
      <div className="text-right w-full mx-3 min-h-[81vh]">
        <h1 className="text-xl">عدم دسترسی</h1>
        {message && <div className="mb-4 text-red-500">{message}</div>}
        <Link href={"/"} className="hover:text-[#183e6e]">بازگشت به صفحه اصلی</Link>
      </div>
    </Layout>
  );
}
