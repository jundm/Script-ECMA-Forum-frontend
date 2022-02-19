import useFetch from "@utils/Hook/useFetch";
import Head from "next/head";
import React from "react";
import nl2br from "react-nl2br";
import dayjs from "dayjs";

interface ArticleViewProps {
  id: number;
}

function ArticleView({ id }: ArticleViewProps) {
  const { data, error } = useFetch(`posts/api/${id}`);
  if (error) {
    return error.message;
  }
  return (
    <div>
      <Head>
        <title>{data?.title}-ScriptECMAForum</title>
      </Head>
      <h1 className="text-xl">{data?.title}</h1>
      <div className="flex">
        <div>{data?.author.username}</div>
        <div>{dayjs(data?.created_at).format("MM-DD")}</div>
        <div>조회 {data?.hit}</div>
        <div>추천 {data?.likes}</div>
      </div>
      <hr />
      <p>{nl2br(data?.content)}</p>
    </div>
  );
}

export default ArticleView;
