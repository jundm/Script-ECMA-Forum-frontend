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
import axios from "axios";
import useSWR from "swr";

function App({ Component, pageProps }: AppProps) {
  const toggleHeader = useSelector(globalHeader);
  let headerState = toggleHeader.payload.globalReducer.header;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(headerState);
  useEffect(() => {
    dispatch(globalHeader(isOpen));
  }, [isOpen]);
  const cookies = new Cookies();
  const router = useRouter();
  const accessToken = cookies.get("accessToken");
  if (accessToken) {
    axios.defaults.headers.common.Authorization = `JWT ${accessToken}`;
  }
  //*@params 임시 HOC (더 좋은 방법 없을까?)
  useEffect(() => {
    if (cookies.get("accessToken") && cookies.get("refreshToken")) {
      setVerrifyToken();
    } else {
      router.push("/accounts/login");
    }
  }, [router.route]);
  const fetcher = (url: any) =>
    axios
      .get(process.env.NEXT_PUBLIC_ENV_BASE_URL + url)
      // .get(url)
      .then((res) => res.data);
  const { data, error } = useSWR("users/me/", fetcher);
  console.log("data", data);
  console.error("error", error);

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
        <HeaderSmall setIsOpen={setIsOpen} />
      ) : (
        <HeaderBig setIsOpen={setIsOpen} />
      )}
      <div className="container mx-auto px-4">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default wrapper.withRedux(App);
