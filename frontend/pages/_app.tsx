import "@/styles/global.css";
import type { AppProps } from "next/app";
import HeaderBig from "@/components/HeaderBig";
import { useState } from "react";
import HeaderSmall from "@/components/HeaderSmall";

export default function App({ Component, pageProps }: AppProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
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
