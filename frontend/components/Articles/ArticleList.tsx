import Link from "next/link";
import React, { Fragment, useEffect } from "react";
import { Button, Table, Tag } from "antd";
import useFetch from "@utils/Hook/useFetch";
import Head from "next/head";
import { useRouter } from "next/router";
import { setVerifyToken } from "@utils/Cookies/TokenManager";
import dayjs from "dayjs";

interface ArticleListProps {
  category: string;
  page: string;
  title: string;
  subtitle: string;
  url: string;
}
interface ArticleProps {
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
  comment: number;
  created_at: string;
  updated_at: string;
}

//TODO 태그 색상 렌덤 개발모드여서 리랜더링 되는지 확인하기
function ArticleList({
  title,
  subtitle,
  category,
  page,
  url,
}: ArticleListProps) {
  const router = useRouter();
  const { data, error } = useFetch(`${url}${page}`);

  useEffect(() => {
    if (error) {
      setVerifyToken();
      // console.error(error.message);
    }
  }, [error, data]);

  const columns = [
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      render: (title: string, row: ArticleProps, index: number) => (
        <>
          {row.tag_set.map((tag, index) => {
            const colorRandom = [
              "magenta",
              "red",
              "volcano",
              "orange",
              "gold",
              "lime",
              "green",
              "cyan",
              "blue",
              "geekblue",
              "purple",
            ];
            let color =
              colorRandom[Math.floor(Math.random() * colorRandom.length)];
            return (
              <Tag color={color} key={index}>
                <div className="text-[0.6rem]">{tag}</div>
              </Tag>
            );
          })}
          <div>
            <Link href={`/articles/${category}/${row.id}`}>
              <a className="text-base">
                {title} {row.comment !== 0 && `[${row.comment}]`}
              </a>
            </Link>
          </div>
        </>
      ),
    },
    {
      title: "작성자",
      dataIndex: "author",
      key: "author",
      width: "90px" + "1%",
      render: (author: {
        avatar_url: string;
        name: string;
        username: string;
      }) => (
        <div className="flex">
          {/* eslint-disable */}
          <img
            className="rounded-full ml-[-10px] mr-1 w-5 h-5"
            src={author.avatar_url}
            alt="avatar"
          />
          {author.username}
        </div>
      ),
    },
    {
      title: "작성일",
      dataIndex: "created_at",
      key: "created_at",
      width: "80px",
      render: (created_at: string) => dayjs(created_at).format("MM-DD"),
    },
    {
      title: "조회",
      dataIndex: "hit",
      key: "hit",
      width: "60px",
    },
    {
      title: "추천",
      dataIndex: "likes",
      key: "likes",
      width: "60px",
    },
  ];
  const dataSource = data?.results.map((article: ArticleProps) => article);

  return (
    <div className="container">
      <Head>{category}-ScriptECMAForum</Head>
      <div className="flex justify-between ">
        <div>
          <strong className="text-xl">{title}</strong>
          <p>{subtitle}</p>
        </div>
        {router.pathname !== "/articles/hot" && (
          <Link href={`/articles/${category}/create`}>
            <a className="mt-6">
              <Button type="primary" shape="round">
                글쓰기
              </Button>
            </a>
          </Link>
        )}
      </div>
      <div className="board_list_wrap">
        <Table
          rowKey="id"
          dataSource={dataSource}
          columns={columns}
          pagination={{
            position: ["bottomCenter"],
            defaultPageSize: 30,
            total: data?.total,
            current: data?.current_page,
            onChange: (page: any) => {
              router.push(`?page=${page}`);
            },
          }}
        />
      </div>
    </div>
  );
}

export default ArticleList;
