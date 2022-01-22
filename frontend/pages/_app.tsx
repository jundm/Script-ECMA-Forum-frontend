import type { AppProps } from "next/app";
import { useState } from "react";
import HeaderBig from "@/components/HeaderBig";
import HeaderSmall from "@/components/HeaderSmall";
import { wrapper } from "../utils/Toolkit/store";
import "@/styles/global.css";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {isOpen ? (
        <HeaderSmall
          // saveLocalStorage={saveLocalStorage}
          setIsOpen={setIsOpen}
        />
      ) : (
        <HeaderBig
          // saveLocalStorage={saveLocalStorage}
          setIsOpen={setIsOpen}
        />
      )}
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
