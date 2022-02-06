import Link from "next/link";
import React from "react";
import { Button } from "antd";
import useFetch from "@utils/Hook/useFetch";

interface ArticleListProps {
  title: any;
  category: any;
}

function ArticleList({ title, category }: ArticleListProps) {
  const { data, error } = useFetch(
    `${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/`
  );
  if (error) {
    return <>데이터를 불러올 수 없습니다.</>;
  }
  return (
    <div className="container">
      <h1>{title}</h1>
      <Link href={`/articles/${category}/create`}>
        <a>
          <Button type="primary" shape="round">
            글쓰기
          </Button>
        </a>
      </Link>
    </div>
  );
}

export default ArticleList;
