import Link from "next/link";
import React from "react";
import { Button } from "antd";
import useFetch from "@utils/Hook/useFetch";
import Head from "next/head";
import Pagination from "rc-pagination";
import { useRouter } from "next/router";
import { setVerifyToken } from "@utils/Cookies/TokenManager";

interface ArticleListProps {
  title: string;
  category: string;
  page: any;
}

function ArticleList({ title, category, page }: ArticleListProps) {
  const router = useRouter();
  const { data, error } = useFetch(`posts/api/?category=free&page=${page}`);
  if (error) {
    setVerifyToken();
    console.error(error);
  }
  console.log("data", data);
  return (
    <div className="container">
      <Head>{category}-ScriptECMAForum</Head>
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
      <Pagination
        pageSize={30}
        total={data?.total}
        current={data?.current_page}
        onChange={(page) => {
          router.push(`?page=${page}`);
        }}
      />
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
