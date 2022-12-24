import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        {Component.auth ? (
          <Auth>
            <ToastContainer position="bottom-center" limit={1} />
            <Component {...pageProps} />
          </Auth>
        ) : (
          <>
            <ToastContainer position="bottom-center" limit={1} />
            <Component {...pageProps} />
          </>
        )}
      </StoreProvider>
    </SessionProvider>
  );
}

function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  if (status === "loading") {
    return (
      <div className="w-full text-center text-[2rem] font-bold">
        در حال بررسی ...
      </div>
    );
  }
  return <>{children}</>;
}

export default MyApp;
