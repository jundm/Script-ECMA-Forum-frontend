import useFetch from "@utils/Hook/useFetch";
import { Card } from "antd";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

interface Article {
  hit: number;
  id: number;
  author: {
    avatar_url: string;
    name: string;
    username: string;
  };
  content: string;
  likes: number;
  tag_set: [];
  title: string;
  comment: number;
  created_at: string;
  updated_at: string;
}

export default function Main() {
  const { data: free, error: freeError } = useFetch(
    `posts/api/?category=free&page=1`
  );
  const { data: question, error: questionError } = useFetch(
    `posts/api/?category=question&page=1`
  );
  const { data: news, error: newsError } = useFetch(
    `posts/api/?category=news&page=1`
  );
  const { data: hot, error: hotError } = useFetch(`posts/api/hot/?page=1`);

  return (
    <div>
      <Head>
        <title>ScriptECMAForum</title>
      </Head>
      <div className="flex flex-wrap flex-row justify-center mx-auto max-w-4xl">
        <Card
          title="질문 게시판"
          extra={<a href="articles/question/">More</a>}
          className="sm:w-[300px] w-full"
        >
          {question?.results
            ?.slice(0, 6)
            .map((question: Article, key: number) => {
              return (
                <div key={key} style={{ marginBottom: "1px" }}>
                  <Link href={`/articles/question/${question.id}`}>
                    <a>{question.title}</a>
                  </Link>
                </div>
              );
            })}
        </Card>

        <Card
          title="자유 게시판"
          extra={<a href="articles/free/">More</a>}
          className="sm:w-[300px] w-full"
        >
          {free?.results?.slice(0, 6).map((free: Article, key: number) => {
            return (
              <div key={key} style={{ marginBottom: "1px" }}>
                <Link href={`/articles/free/${free.id}`}>
                  <a>{free.title}</a>
                </Link>
              </div>
            );
          })}
        </Card>
        <Card
          title="인기 게시판"
          extra={<a href="articles/hot/">More</a>}
          className="sm:w-[300px] w-full"
        >
          {hot?.results?.slice(0, 6).map((hot: Article, key: number) => {
            return (
              <div key={key} style={{ marginBottom: "1px" }}>
                <Link href={`/articles/hot/${hot.id}`}>
                  <a>{hot.title}</a>
                </Link>
              </div>
            );
          })}
        </Card>
        <Card
          title="새소식 게시판"
          extra={<a href="articles/news/">More</a>}
          className="sm:w-[300px] w-full"
        >
          {news?.results?.slice(0, 6).map((news: Article, key: number) => {
            return (
              <div key={key} style={{ marginBottom: "1px" }}>
                <Link href={`/articles/news/${news.id}`}>
                  <a>{news.title}</a>
                </Link>
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}
