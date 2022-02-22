import useFetch from "@utils/Hook/useFetch";
import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import nl2br from "react-nl2br";
import dayjs from "dayjs";
import { Avatar, Comment, Divider, Button } from "antd";
import { LikeOutlined, LikeFilled, EditOutlined } from "@ant-design/icons";
import { setVerifyToken } from "@utils/Cookies/TokenManager";
import axios from "axios";
import ArticleAnswerCreate from "./ArticleAnswerCreate";
import ArticleViewAnswer from "./ArticleViewAnswer";

interface ArticleViewProps {
  id: number;
}
interface AnswerProps {
  id: number;
  author: {
    username: string;
    name: string;
    avatar_url: string;
  };
  title: string;
  content: string;
  likes: number;
  isLikes: boolean;
  created_at: string;
  updated_at: string;
}
function ArticleView({ id }: ArticleViewProps) {
  const { data, error, mutate } = useFetch(`posts/api/${id}`);
  const {
    data: answered,
    error: answeredError,
    mutate: answerMutate,
  } = useFetch(`posts/api/${id}/postComment`);
  const [answer, setAnswer] = useState(false);
  useEffect(() => {
    if (error) {
      //! 중복이여도 없앨수가 없음 오류안나고 access토큰만 삭제되면 실행이 안됨
      setVerifyToken();
      console.error(error.message);
    }
  }, [error]);

  const actions = [
    <>
      <div className="flex items-center">
        <LikeOutlined />
        <span key="comment-nested-reply-to" className="ml-1">
          Reply to
        </span>
      </div>
    </>,
  ];

  return (
    <div className="">
      <Head>
        <title>{data?.title}-ScriptECMAForum</title>
      </Head>
      <h1 className="text-xl">{data?.title}</h1>
      <div className="flex items-center">
        {/* eslint-disable */}
        <img
          className="rounded-full w-5 h-5 mr-1"
          src={data?.author.avatar_url}
          alt="avatar"
        />
        <div className="mr-1">{data?.author.username}</div>
        <div className="mr-1 ">
          <Divider type="vertical" className="border-[1px]" />
          {dayjs(data?.created_at).format("MM-DD hh:mm")}
        </div>
        <div className="ml-auto mr-1">조회 {data?.hit}</div>
        <div>추천 {data?.likes}</div>
      </div>
      <Divider className="mt-2 mb-7 border-2" />
      <div className=" min-h-[35vh]">
        <p>{nl2br(data?.content)}</p>
      </div>
      <div className="flex items-center justify-center text-[24px]">
        {data?.isLikes ? (
          <LikeFilled
            onClick={async () => {
              mutate({ ...data }, false);
              await axios.delete(
                `${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/${data?.id}/like/`
              );
              mutate({ ...data });
            }}
          />
        ) : (
          <LikeOutlined
            onClick={async () => {
              mutate({ ...data }, false);
              await axios.post(
                `${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/${data?.id}/like/`,
                { ...data }
              );
              mutate({ ...data });
            }}
          />
        )}
        {data?.likes}
        {data?.category === "question" && (
          <Button
            className="ml-4"
            icon={<EditOutlined className="text-xl" />}
            size="middle"
            onClick={() => setAnswer(!answer)}
          >
            답변하기
          </Button>
        )}
      </div>
      {answer && (
        <ArticleAnswerCreate
          category={data?.category}
          id={data?.id}
          setAnswer={setAnswer}
          // data={data}
          answered={answered}
        />
      )}

      {answered?.results?.map((answer: AnswerProps, index: number) => {
        return <ArticleViewAnswer key={index} id={id} answer={answer} />;
      })}

      <Divider className="border-[1px]" />
      <Comment
        actions={actions}
        author={<a>Han Solo</a>}
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <p>
            We supply a series of design principles, practical patterns and high
            quality design resources (Sketch and Axure).
          </p>
        }
        datetime={<span>{dayjs(data?.created_at).format("MM-DD hh:mm")}</span>}
      >
        <Comment
          author={<a>Han Solo</a>}
          avatar={
            <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          }
          content={
            <p>
              We supply a series of design principles, practical patterns and
              high quality design resources (Sketch and Axure), to help people
              create their product prototypes beautifully and efficiently.
            </p>
          }
          datetime={
            <span>{dayjs(data?.created_at).format("MM-DD hh:mm")}</span>
          }
        />
      </Comment>
      <Divider className="border-[1px]" />
    </div>
  );
}

export default ArticleView;
