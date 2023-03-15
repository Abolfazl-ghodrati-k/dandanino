import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

axios.defaults.baseURL = "https://dandanino.vercel.app";
axios.defaults.headers.post["Content-Type"] = "application/json";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    <SessionProvider session={session}>
        <StoreProvider>
          {Component.auth ? (
            <Auth adminOnly={Component.auth.adminOnly}>
              <ToastContainer
                position="bottom-center"
                limit={5}
                style={{ fontSize: "10px" }}
              />
              <Component {...pageProps} />
            </Auth>
          ) : (
            <>
              <ToastContainer position="bottom-center" limit={5} />
              <Component {...pageProps} />
            </>
          )}
        </StoreProvider>
    </SessionProvider>
  );
}

function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });
  if (status === "loading") {
    return (
      <div className="w-full text-center text-[2rem] font-bold">
        در حال بررسی ...
      </div>
    );
  }
  if (adminOnly && !session.user.email) {
    router.push(`/unauthorized?message=${session.user.isAdmin}`);
  }
  return <>{children}</>;
}

export default MyApp;
