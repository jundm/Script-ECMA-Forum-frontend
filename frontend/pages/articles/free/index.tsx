import ArticleList from "@components/Articles/ArticleList";
import { fetcher } from "@utils/Hook/useFetch";
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
}

function Free({ fallback }: FreeProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <div>
        <ArticleList title="자유 게시판" category="free" />
      </div>
    </SWRConfig>
  );
}
export const getServerSideProps = async () => {
  const url = "posts/api/?category=free";
  const articleList = await fetcher(url);
  return {
    props: {
      fallback: {
        [url]: articleList,
      },
    },
  };
};

export default Free;
