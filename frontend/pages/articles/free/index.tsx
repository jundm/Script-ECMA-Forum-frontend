import ArticleList from "@components/Articles/ArticleList";
import { fetcher } from "@utils/Hook/useFetch";
import isbot from "isbot";
import React from "react";
import { SWRConfig } from "swr";

interface FreeProps {
  fallback: {
    string: {
      count: number;
      next: string | null;
      previous: string | null;
      results: [];
    };
  };
  page: any;
}

function Free({ page, fallback }: FreeProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <div>
        <ArticleList title="자유 게시판" subtitle="자유롭게 소통하되 매너있게" category="free" page={page} />
      </div>
    </SWRConfig>
  );
}
export const getServerSideProps = async ({ query, req }: any) => {
  const page = query.page || 1;
  const url = `posts/api/?category=free&page=${page}`;
  const articleList = isbot(req.headers["user-agent"])
    ? await fetcher(url)
    : null;
  return {
    props: {
      page,
      fallback: {
        [url]: articleList,
      },
    },
  };
};

export default Free;
