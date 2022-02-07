import _App, { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "@styles/global.css";
import "antd/dist/antd.css";
import Head from "next/head";
import HeaderBig from "@components/HeaderBig";
import HeaderSmall from "@components/HeaderSmall";
import { wrapper } from "@utils/Toolkit/store";
import { globalHeader, name, userName } from "@utils/Toolkit/Slice/globalSlice";
import { setVerrifyToken } from "@utils/Cookies/TokenManager";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { detect } from "detect-browser";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@utils/Toolkit/hook";

function App({ Component, pageProps }: AppProps) {
  const toggleHeader = useAppSelector(globalHeader);
  let headerState = toggleHeader.payload.globalReducer.header;
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [isSafari, setIsSafari] = useState(false);
  const isBrowser = detect();
  const saveLocalStorage = () => {
    localStorage.setItem("toogle", JSON.stringify(!isOpen));
  };
  useEffect(() => {
    setIsSafari(isBrowser?.os === "iOS" || isBrowser?.os === "Mac OS");
    const isOpen = localStorage.getItem("toogle");
    if (isOpen) {
      setIsOpen(JSON.parse(isOpen));
    }
  }, [isOpen]);
  const cookies = new Cookies();
  // const router = useRouter();
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");
  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common.Authorization = `JWT ${accessToken}`;
    } else {
      axios.defaults.headers.common.Authorization = "";
    }
  }, [accessToken]);
  //*@params 임시 HOC (더 좋은 방법 없을까?)
  useEffect(() => {
    console.log("실행");
    if (accessToken && refreshToken) {
      axios
        .get(process.env.NEXT_PUBLIC_ENV_BASE_URL + "users/me/")
        .then((res) => {
          dispatch(userName(res.data.username));
          dispatch(name(res.data.username));
        })
        .catch((e) => console.warn(e.message));
    }
  }, [refreshToken]);
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
      {isOpen ? (
        <HeaderSmall
          setIsOpen={setIsOpen}
          isSafari={isSafari}
          saveLocalStorage={saveLocalStorage}
        />
      ) : (
        <HeaderBig
          setIsOpen={setIsOpen}
          isSafari={isSafari}
          saveLocalStorage={saveLocalStorage}
        />
      )}
      <div className="container mx-auto px-4">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default wrapper.withRedux(App);
