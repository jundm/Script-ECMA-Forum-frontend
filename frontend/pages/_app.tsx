import _App, { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "@styles/global.css";
import "antd/dist/antd.css";
import Head from "next/head";
import HeaderBig from "@components/HeaderBig";
import HeaderSmall from "@components/HeaderSmall";
import { wrapper } from "@utils/Toolkit/store";
import { globalHeader } from "@utils/Toolkit/Slice/globalSlice";
import Cookies from "universal-cookie";
import { detect } from "detect-browser";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@utils/Toolkit/hook";
import { name, userName } from "@utils/Toolkit/Slice/userSlice";
import { useRouter } from "next/router";
import { setVerifyToken } from "@utils/Cookies/TokenManager";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const routeName = router.pathname.split("/");
  const toggleHeader = useAppSelector(globalHeader);
  let headerState = toggleHeader.payload.global.header;
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(headerState);
  const [isSafari, setIsSafari] = useState(false);
  const isBrowser = detect();
  useEffect(() => {
    setIsSafari(isBrowser?.os === "iOS" || isBrowser?.os === "Mac OS");
    dispatch(globalHeader(isOpen));
  }, [isOpen]);
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");
  useEffect(() => {
    if (accessToken && refreshToken) {
      axios.defaults.headers.common.Authorization = `JWT ${accessToken}`;
      axios
        .get(process.env.NEXT_PUBLIC_ENV_BASE_URL + "users/me/")
        .then((res) => {
          dispatch(userName(res.data.username));
          dispatch(name(res.data.username));
        })
        .catch((e) => console.warn(e.message));
    } else if (!accessToken && !refreshToken) {
      axios.defaults.headers.common.Authorization = "";
    } else if (!accessToken && refreshToken) {
      setVerifyToken();
    }
  }, [accessToken]);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{routeName[routeName.length - 1]}-ScriptECMAForum</title>
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
      <div className="container mx-auto px-4">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default wrapper.withRedux(App);
