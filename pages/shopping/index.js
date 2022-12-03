import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../../components/Layout";

function ShippingScreen() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      console.log(session);
    } else {
      router.push("/");
    }
  });
  return <Layout>shopping</Layout>;
}

export default ShippingScreen;
ShippingScreen.auth = true;
