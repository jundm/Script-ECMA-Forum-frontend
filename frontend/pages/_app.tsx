import _App, { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "@styles/global.css";
import "antd/dist/antd.css";
import Head from "next/head";
import HeaderBig from "@components/HeaderBig";
import HeaderSmall from "@components/HeaderSmall";
import { wrapper } from "@utils/Toolkit/store";
import { useDispatch, useSelector } from "react-redux";
import { globalHeader } from "@utils/Toolkit/Slice/globalSlice";
import { setVerrifyToken } from "@utils/Cookies/TokenManager";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { detect } from "detect-browser";

function App({ Component, pageProps }: AppProps) {
  const toggleHeader = useSelector(globalHeader);
  let headerState = toggleHeader.payload.globalReducer.header;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(headerState);
  const [isSafari, setIsSafari] = useState(false);
  const isBrowser = detect();
  useEffect(() => {
    dispatch(globalHeader(isOpen));
    setIsSafari(isBrowser?.os === "iOS" || isBrowser?.os === "Mac OS");
  }, [isOpen]);
  const cookies = new Cookies();
  const router = useRouter();
  //*@params 임시 HOC
  useEffect(() => {
    if (cookies.get("accessToken")) {
      setVerrifyToken();
    } else {
      router.push("/accounts/login");
    }
  }, [router.route]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>ScriptECMAForum</title>
        <link
          rel="icon"
          type="image/png"
          href="https://user-images.githubusercontent.com/80582578/150659751-3470092d-4f58-438a-b347-1b0ecbe66151.png"
        />
      </Head>
      {headerState ? (
        <HeaderSmall setIsOpen={setIsOpen} isSafari={isSafari} />
      ) : (
        <HeaderBig setIsOpen={setIsOpen} isSafari={isSafari} />
      )}
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
