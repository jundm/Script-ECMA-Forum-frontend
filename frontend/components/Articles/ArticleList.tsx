import Link from "next/link";
import React from "react";
import { Button } from "antd";

interface ArticleListProps {
  title: any;
  category: any;
}

function ArticleList({ title, category }: ArticleListProps) {
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
