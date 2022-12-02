import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function DropdownLink(props) {
  const [Active, setActive] = useState(false);
  let { href, children,redirect, className } = props;
  const router = useRouter();
  useEffect(() => {
    if (router.pathname.includes(href)) {
      setActive((active) => (active = true));
    }
  }, []);
  return (
    <Link href={{pathname:href, redirect: redirect?redirect:''}}>
      <p className={`${className} ${Active ? "bg-gray-200" : ""}`}>{children}</p>
    </Link>
  );
}
