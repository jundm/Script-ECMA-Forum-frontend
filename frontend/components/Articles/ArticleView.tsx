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
import { Div } from "@components/HeaderBig/styles";
import ArticleComment from "@components/Comments/ArticleComment";
import CommentCreates from "@components/Comments/CommentCreates";

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
  const { data, error, mutate } = useFetch(`posts/api/${id}/`);
  const {
    data: answered,
    error: answeredError,
    mutate: answerMutate,
  } = useFetch(`posts/api/${id}/postComment/`);
  const [answer, setAnswer] = useState(false);
  useEffect(() => {
    if (error) {
      setVerifyToken();
      // console.error(error.message);
    }
  }, [error, data]);

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
              mutate({ ...data, isLikes: false, likes: data.likes - 1 }, false);
              await axios.delete(
                `${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/${data?.id}/like/`
              );
            }}
          />
        ) : (
          <LikeOutlined
            onClick={async () => {
              mutate({ ...data, isLikes: true, likes: data.likes + 1 }, false);
              await axios.post(
                `${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/${data?.id}/like/`,
                { ...data }
              );
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
          id={data?.id}
          setAnswer={setAnswer}
          answered={answered}
          answerMutate={answerMutate}
        />
      )}

      {answered?.results?.map(
        (answer: AnswerProps, index: number, children: any) => {
          return (
            <ArticleViewAnswer
              key={index}
              index={index}
              id={id}
              answer={answer}
              answerMutate={answerMutate}
            />
          );
        }
      )}

      <Divider className="border-[1px]" />
      <ArticleComment />
      <CommentCreates
        id={data?.id}
        answerMutate={answerMutate}
      />
    </div>
  );
}

export default ArticleView;
