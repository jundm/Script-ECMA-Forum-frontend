import useFetch from "@utils/Hook/useFetch";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import nl2br from "react-nl2br";
import dayjs from "dayjs";
import { Avatar, Comment, Divider } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { setVerifyToken } from "@utils/Cookies/TokenManager";
import axios from "axios";

interface ArticleViewProps {
  id: number;
}

function ArticleView({ id }: ArticleViewProps) {
  const { data, error } = useFetch(`posts/api/${id}`);
  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState(0);
  if (error) {
    console.error(error.message);
    setVerifyToken();
  }
  useEffect(() => {
    if (data) {
      setIsLike(data.isLike);
      setLikes(data.likes);
    }
  }, [data]);
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
        <div>추천 {likes}</div>
      </div>
      <Divider className="mt-2 mb-7 border-2" />
      <div className=" min-h-[35vh]">
        <p>{nl2br(data?.content)}</p>
      </div>
      <div className="flex items-center justify-center text-[24px]">
        {isLike ? (
          <LikeFilled
            onClick={() => {
              setIsLike(false);
              axios
                .delete(
                  `${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/${data?.id}/like/`,
                  { ...data }
                )
                .then((response) => {
                  setLikes(likes - 1);
                });
            }}
          />
        ) : (
          <LikeOutlined
            onClick={() => {
              setIsLike(true);
              axios
                .post(
                  `${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/${data?.id}/like/`,
                  { ...data }
                )
                .then((response) => {
                  setLikes(likes + 1);
                });
            }}
          />
        )}
        {likes}
      </div>
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
          actions={actions}
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
