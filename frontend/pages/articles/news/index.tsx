import ArticleList from "@components/Articles/ArticleList";
import fetcher from "@utils/Hook/useFetch";
import isbot from "isbot";
import React from "react";
import { SWRConfig } from "swr";

interface NewsProps {
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

function News({ page, fallback }: NewsProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <div>
        <ArticleList
          title="새소식 게시판"
          subtitle="새로운 소식을 전하러 왔습니다"
          category="news"
          page={page}
          url="posts/api/?category=news&page="
        />
      </div>
    </SWRConfig>
  );
}
export const getServerSideProps = async ({ query, req }: any) => {
  const page = query.page || 1;
  const url = `posts/api/?category=news&page=${page}`;
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

export default News;
