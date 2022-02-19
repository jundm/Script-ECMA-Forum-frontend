import ArticleList from "@components/Articles/ArticleList";
import fetcher from "@utils/Hook/useFetch";
import isbot from "isbot";
import React from "react";
import { SWRConfig } from "swr";

interface HotProps {
  fallback: {
    string: {
      count: number;
      next: string | null;
      previous: string | null;
      results: [];
    };
  };
  page: string;
}

function Hot({ page, fallback }: HotProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <div>
        <ArticleList
          title="인기 게시판"
          subtitle="한주간의 가장 핫한 소식(추천수가 가장 많은 60개 유통기한은 생성일로 부터 7일)"
          category="hot"
          page={page}
          url="posts/api/hot/?page="
        />
      </div>
    </SWRConfig>
  );
}
export const getServerSideProps = async ({ query, req }: any) => {
  const page = query.page || 1;
  const url = `posts/api/hot/?page=${page}`;
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

export default Hot;
