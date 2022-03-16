import React, { useEffect, useState } from "react";
import useFetch from "@utils/Hook/useFetch";
import { Divider } from "antd";
import { LikeOutlined, LikeFilled, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import nl2br from "react-nl2br";

interface ArticleViewAnswerProps {
  index: number;
  id: number;
  answer: {
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
  };
  answerMutate: any;
}
//* 답변 게시물
function ArticleViewAnswer({
  index,
  id,
  answer,
  answerMutate,
}: ArticleViewAnswerProps) {
  const { data, mutate } = useFetch(
    `posts/api/${id}/postComment/${answer?.id}/`
  );
  return (
    <>
      <Divider className="mt-2 mb-7 border-2" />
      <div className="flex items-center">
        <h3 className="text-xl">{answer?.title}</h3>
        {/* eslint-disable */}
        <img
          className="rounded-full w-5 h-5 mr-1 ml-auto"
          src={answer?.author?.avatar_url}
          alt="avatar"
        />
        <div className="mr-1">{answer?.author?.username}</div>
        <div className="mr-1 ">
          <Divider type="vertical" className="border-[1px]" />
        </div>
        <div className=" mr-1">
          {dayjs(answer?.created_at).format("MM-DD hh:mm")}
        </div>
        <div>추천 {data?.likes}</div>
      </div>
      <div className=" min-h-[35vh]">
        <p>{nl2br(answer?.content)}</p>
      </div>
      <div className="flex items-center justify-center text-[24px]">
        {data?.isLikes ? (
          <LikeFilled
            onClick={async () => {
              mutate(
                {
                  answer,
                  isLikes: false,
                  likes: data.likes - 1,
                },
                false
              );
              await axios.delete(
                `${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/${id}/postComment/${answer?.id}/like/`
              );
            }}
          />
        ) : (
          <LikeOutlined
            onClick={async () => {
              mutate(
                {
                  answer,
                  isLikes: true,
                  likes: data.likes + 1,
                },
                false
              );
              await axios.post(
                `${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/${id}/postComment/${answer?.id}/like/`,
                { ...data }
              );
            }}
          />
        )}
        {data?.likes}
      </div>
    </>
  );
}

export default ArticleViewAnswer;
