import Link from "next/link";
import React from "react";
import { Button } from "antd";
import useFetch from "@utils/Hook/useFetch";

interface ArticleListProps {
  title: any;
  category: any;
}
//* 값 참고
// author: {username: '', name: '', avatar_url: '/avatar/image/jun.png'}
// category: "free"
// content: "호호호"
// created_at: "2022-02-07T16:29:04.050399+09:00"
// id: 3
// tag_set: []
// title: "이건 세번째 글이야"
// updated_at: "2022-02-07T16:29:04.050450+09:00"

function ArticleList({ title, category }: ArticleListProps) {
  const { data, error } = useFetch(`posts/api/`);
  if (error) {
    return error.message;
  }

  return (
    <div className="container">
      <h1>{title}</h1>
      <ul>
        {data?.results.map((article: any) => (
          <>
            <li key={article.id.toString()}>
              <Link href={`/articles/${category}/${article.id}`}>
                <a>{article.title}</a>
              </Link>
            </li>
          </>
        ))}
      </ul>
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
