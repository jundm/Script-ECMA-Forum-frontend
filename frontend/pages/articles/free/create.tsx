import ArticleCreate from "@components/Articles/ArticleCreate";
import { GetServerSideProps } from "next";
import React from "react";
import Cookies from "universal-cookie";

interface CreateProps {}

function Create({}: CreateProps) {
  return (
    <div>
      <ArticleCreate category="free" />
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookieReq = context.req ? context.req.headers.cookie : null;
  const cookies = new Cookies(cookieReq);
  const refreshToken = cookies.get("refreshToken");
  const resolvedUrl = context.resolvedUrl;
  if (refreshToken) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        destination: resolvedUrl.slice(0, -6),
        permanent: false,
      },
    };
  }
};
export default Create;
