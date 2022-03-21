import { Avatar, Comment, Divider, Button } from "antd";
import { LikeOutlined, LikeFilled, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import React, { useState, Fragment, useEffect } from "react";
import useFetch from "@utils/Hook/useFetch";
import { useRouter } from "next/router";

import CommentCreate from "./CommentCreates";
import ArticleReplyComponent from "./ArticleReplyComponent";
import axios from "axios";
import { setVerifyToken } from "@utils/Cookies/TokenManager";

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
interface DataCommentProps {
  count: number;
  next: string | null;
  previous: string | null;
  results: [CommentProps];
}

function ArticleComment({}: ArticleCommentProps) {
  const router = useRouter();
  const [replyCreate, setReplyCreate] = useState(false);
  const { data, error, mutate } = useFetch(
    `posts/api/${router.query.id}/comments/`
  );
  useEffect(() => {
    if (error) {
      setVerifyToken();
      // console.error(error.message);
    }
  }, [error, data]);
  return (
    <>
      {data?.results?.map((comments: CommentProps, key: number) => {
        return (
          <Comment
            key={key}
            actions={[
              <>
                <div className="flex">
                  {comments.isLikes ? (
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={async () => {
                        mutate((likes: DataCommentProps) => {
                          return {
                            ...likes,
                            results: [
                              ...likes.results.map((result: CommentProps) =>
                                result.id === comments.id
                                  ? {
                                      ...result,
                                      isLikes: false,
                                      likes: result.likes - 1,
                                    }
                                  : result
                              ),
                            ],
                          };
                        }, false);
                        await axios.delete(
                          `${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/${router.query.id}/comments/${comments.id}/like/`
                        );
                      }}
                    >
                      <LikeFilled className="mr-1" />
                      like
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={async () => {
                        mutate((likes: DataCommentProps) => {
                          return {
                            ...likes,
                            results: [
                              ...likes.results.map((result: CommentProps) =>
                                result.id === comments.id
                                  ? {
                                      ...result,
                                      isLikes: true,
                                      likes: result.likes + 1,
                                    }
                                  : result
                              ),
                            ],
                          };
                        }, false);
                        await axios.post(
                          `${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/${router.query.id}/comments/${comments.id}/like/`
                        );
                      }}
                    >
                      <LikeOutlined className="mr-1" />
                      like
                    </div>
                  )}

                  <span
                    className="ml-1 cursor-pointer"
                    onClick={() => {
                      setReplyCreate(!replyCreate);
                    }}
                  >
                    Reply to
                  </span>
                </div>
              </>,
            ]}
            author={<a>{comments?.author.username}</a>}
            avatar={
              <Avatar
                src={comments?.author.avatar_url}
                alt={comments?.author.username}
              />
            }
            content={<p>{comments?.content}</p>}
            datetime={
              <span>
                {dayjs(comments?.updated_at).format("MM-DD hh:mm")} 추천:
                {comments?.likes}
              </span>
            }
          >
            {replyCreate && (
              <CommentCreate
                api={`posts/api/${comments?.id}/commentsReply/`}
                setReplyCreate={setReplyCreate}
              />
            )}

            <ArticleReplyComponent id={comments?.id} />
          </Comment>
        );
      })}
    </>
  );
}

export default ArticleComment;
