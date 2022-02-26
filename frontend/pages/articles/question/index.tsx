import ArticleList from "@components/Articles/ArticleList";
import fetcher from "@utils/Hook/useFetch";
import isbot from "isbot";
import React from "react";
import { SWRConfig } from "swr";

interface QuestionProps {
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

function Question({ page, fallback }: QuestionProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <div>
        <ArticleList
          title="질문 게시판"
          subtitle="누군가는 답해줄겁니다"
          category="question"
          page={page}
          url="posts/api/?category=question&page="
        />
      </div>
    </SWRConfig>
  );
}
export const getServerSideProps = async ({ query, req }: any) => {
  const page = query.page || 1;
  const url = `posts/api/?category=question&page=${page}`;
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

export default Question;
