import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "@styles/global.css";
import Head from "next/head";
import HeaderBig from "@components/HeaderBig";
import HeaderSmall from "@components/HeaderSmall";
import { wrapper } from "@utils/Toolkit/store";
import { useDispatch, useSelector } from "react-redux";
import { userHeader } from "@utils/Toolkit/Slice/userSlice";
// 
function App({ Component, pageProps }: AppProps) {
  const checkUser = useSelector(userHeader);
  let headerState = checkUser.payload.userReducer.header;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(headerState);
  useEffect(() => {
    dispatch(userHeader(isOpen));
  }, [isOpen]);
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

export default wrapper.withRedux(App);
