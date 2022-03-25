import React, { useEffect } from "react";
import useFetch from "@utils/Hook/useFetch";
import { useRouter } from "next/router";
import { setVerifyToken } from "@utils/Cookies/TokenManager";
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
  if (error) {
    console.error(error.message);
  }
  return (
    <>
      {data?.results?.map((comments: CommentProps, key: number) => {
        return (
          <ArticleCommentComponent
            key={key}
            comments={comments}
            mutate={mutate}
          />
        );
      })}
    </>
  );
}

export default ArticleComment;
