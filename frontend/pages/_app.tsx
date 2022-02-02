import _App, { AppContext, AppProps } from "next/app";
import { useEffect, useState } from "react";
import "@styles/global.css";
import "antd/dist/antd.css";
import Head from "next/head";
import HeaderBig from "@components/HeaderBig";
import HeaderSmall from "@components/HeaderSmall";
import { wrapper } from "@utils/Toolkit/store";
import { useDispatch, useSelector } from "react-redux";
import { globalHeader } from "@utils/Toolkit/Slice/globalSlice";
import { userName } from "@utils/Toolkit/Slice/userSlice";
import Cookies from "universal-cookie";
import { setLoginToken } from "@utils/Cookies/TokenManager";
import axios from "axios";

function App({ Component, pageProps }: AppProps, { users }: any) {
  console.log("users", users);
  const toggleHeader = useSelector(globalHeader);
  // const checkUser = useSelector(userName);
  // console.log(checkUser, "checkUser");
  let headerState = toggleHeader.payload.globalReducer.header;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(headerState);
  useEffect(() => {
    dispatch(globalHeader(isOpen));
  }, [isOpen]);
  // useEffect(() => {
  //   axios
  //     .get(process.env.NEXT_PUBLIC_ENV_BASE_URL + "users/me/")
  //     .then((res) => {
  //       console.log("res", res.data);
  //     })
  //     .catch((e) => console.warn(e));
  // }, []);
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


App.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;
  // const cookieReq = ctx.req ? ctx.req.headers.cookie : null;
  // const cookies = new Cookies(cookieReq);
  // let accessToken = cookies.get("accessToken");
  // const refreshToken = cookies.get("refreshToken");
  // const token =
  //   (axios.defaults.headers.common.Authorization = `JWT ${accessToken}`);
  // if (token.slice(2) !== "JWT") {
  //   let accessToken = axios.post(
  //     process.env.NEXT_PUBLIC_ENV_BASE_URL + "jwt/refresh/",
  //     {
  //       header: { refresh: refreshToken },
  //     }
  //   );
  // }
  // const { data } = await axios.get(
  //   process.env.NEXT_PUBLIC_ENV_BASE_URL + "users/me/"
  // );
  // ctx.store.dispatch({
  //   payload: { username: data },
  // });
  const appProps = await _App.getInitialProps(appContext);
  return {
    // users: data,
    ...appProps,
  };
};
export default wrapper.withRedux(App);
