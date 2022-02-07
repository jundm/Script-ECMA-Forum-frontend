import Link from "next/link";
import React from "react";
import { Button } from "antd";
import useFetch from "@utils/Hook/useFetch";
import Head from "next/head";

interface ArticleListProps {
  title: string;
  category: string;
}

function ArticleList({ title, category }: ArticleListProps) {
  const { data, error } = useFetch(`posts/api/?category=free`);
  if (error) {
    return error.message;
  }
  console.log(data, "data");

  return (
    <div className="container">
      <Head>{category} 심심 ScriptECMAForum</Head>
      <h1>{title}</h1>
      <ul>
        {data?.results.map((article: any) => (
          <li key={article.id.toString()}>
            <Link href={`/articles/${category}/${article.id}`}>
              <a>{article.title}</a>
            </Link>
          </li>
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
