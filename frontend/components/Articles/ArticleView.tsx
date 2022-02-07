import useFetch from "@utils/Hook/useFetch";
import Head from "next/head";
import React from "react";
import nl2br from "react-nl2br";

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
        <title>{data?.title} ScriptECMAForum</title>
      </Head>
      <h1>{data?.title}</h1>
      <hr />
      <p>{nl2br(data?.content)}</p>
    </div>
  );
}

export default ArticleView;
