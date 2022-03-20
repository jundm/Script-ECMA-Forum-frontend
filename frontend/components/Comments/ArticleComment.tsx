import { Avatar, Comment, Divider, Button } from "antd";
import { LikeOutlined, LikeFilled, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import React, { useState } from "react";
import useFetch from "@utils/Hook/useFetch";
import { useRouter } from "next/router";
import ArticleCommentComponent from "./ArticleCommentComponent";

interface ArticleCommentProps {}

interface CommentProps {
  id: number;
  author: {
    username: string;
    name: string;
    avatar_url: string;
  };
  likes: number;
  content: string;
  isLikes: false;
  created_at: string;
  updated_at: string;
}

function ArticleComment({}: ArticleCommentProps) {
  const router = useRouter();
  const { data, error, mutate } = useFetch(
    `posts/api/${router.query.id}/comments/`
  );

  const actions = [
    <>
      <div className="flex items-center">
        <LikeOutlined />
        <span key="comment-nested-reply-to" className="ml-1" onClick={() => {}}>
          Reply to
        </span>
      </div>
    </>,
  ];
  return (
    <>
      {data?.results?.map((comments: CommentProps, key: number) => {
        return <ArticleCommentComponent key={key} comments={comments} />;
      })}
    </>
  );
}

export default ArticleComment;
