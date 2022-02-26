import ArticleView from "@components/Articles/ArticleView";
import fetcher from "@utils/Hook/useFetch";
import isbot from "isbot";
import React from "react";
import { SWRConfig } from "swr";

interface ViewPageProps {
  id: number;
  fallback: {
    id: number;
    category: string;
    hit: number;
    likes: number;
    author: {
      username: string;
      name: string;
      avatar_url: string;
    };
    title: string;
    content: string;
    tag_set: string[];
    comment: number;
    created_at: string;
    updated_at: string;
  };
}

function ViewPage({ id, fallback }: ViewPageProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <div>
        <ArticleView id={id} />
      </div>
    </SWRConfig>
  );
}
export const getServerSideProps = async ({ req, params }: any) => {
  const id = params.id;
  const url = `posts/api/${id}`;
  const article = isbot(req.headers["user-agent"]) ? await fetcher(url) : null;
  return {
    props: {
      id,
      fallback: {
        [url]: article,
      },
    },
  };
};
export default ViewPage;
