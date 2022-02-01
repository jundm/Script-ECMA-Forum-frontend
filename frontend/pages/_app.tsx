import _App, { AppContext, AppProps } from "next/app";
import { useEffect, useState } from "react";
import "@styles/global.css";
import "antd/dist/antd.css";
import Head from "next/head";
import HeaderBig from "@components/HeaderBig";
import HeaderSmall from "@components/HeaderSmall";
import { wrapper } from "@utils/Toolkit/store";
import { useDispatch, useSelector } from "react-redux";
import { userHeader } from "@utils/Toolkit/Slice/userSlice";
import Cookies from "universal-cookie";
import { setLoginToken } from "@utils/Cookies/TokenManager";
import axios from "axios";

function App({ Component, pageProps }: AppProps) {
  const checkUser = useSelector(userHeader);
  let headerState = checkUser.payload.userReducer.header;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(headerState);
  useEffect(() => {
    dispatch(userHeader(isOpen));
  }, [isOpen]);
  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_ENV_BASE_URL + "users/me/")
      .then((res) => {
        console.log("res", res.data);
      })
      .catch((e) => console.warn(e));
  }, []);
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
      <Component {...pageProps} />
    </>
  );
}

//TODO SSR COOKIE 활용하기
App.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;
  const cookieReq = ctx.req ? ctx.req.headers.cookie : null;
  const cookies = new Cookies(cookieReq);
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");
  console.log("accessToken", accessToken);
  console.log("refreshToken", refreshToken);

  const appProps = await _App.getInitialProps(appContext);
  return { ...appProps };
};
export default wrapper.withRedux(App);
