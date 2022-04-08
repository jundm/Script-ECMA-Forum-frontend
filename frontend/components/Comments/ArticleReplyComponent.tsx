import { Avatar, Comment } from "antd";
import dayjs from "dayjs";
import { LikeOutlined, LikeFilled, EditOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import useFetch from "@utils/Hook/useFetch";
import { parseJwt, setVerifyToken } from "@utils/Cookies/TokenManager";
import axios from "axios";
import Cookies from "universal-cookie";

interface ArticleReplyComponentProps {
  id: number;
}
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
function ArticleReplyComponent({ id }: ArticleReplyComponentProps) {
  const { data, error, mutate } = useFetch(`posts/api/${id}/commentsReply/`);
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");
  const expiredToken = parseJwt(accessToken);
  return (
    <>
      {data?.results?.map((reply: CommentProps, key: number) => {
        return (
          <Comment
            key={key}
            author={<a>{reply.author.username}</a>}
            actions={[
              <>
                <div className="flex">
                  {reply.isLikes ? (
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={async () => {
                        if (refreshToken) {
                          setVerifyToken(expiredToken);
                          mutate((likes: DataCommentProps) => {
                            return {
                              ...likes,
                              results: [
                                ...likes.results.map((result: CommentProps) =>
                                  result.id === reply.id
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
                            `${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/${id}/commentsReply/${reply.id}/like/`
                          );
                        } else {
                          alert("로그인이 필요합니다");
                        }
                      }}
                    >
                      <LikeFilled className="mr-1" />
                      like
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={async () => {
                        if (refreshToken) {
                          setVerifyToken(expiredToken);
                          mutate((likes: DataCommentProps) => {
                            return {
                              ...likes,
                              results: [
                                ...likes.results.map((result: CommentProps) =>
                                  result.id === reply.id
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
                            `${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/${id}/commentsReply/${reply.id}/like/`
                          );
                        } else {
                          alert("로그인이 필요합니다");
                        }
                      }}
                    >
                      <LikeOutlined className="mr-1" />
                      like
                    </div>
                  )}
                </div>
              </>,
            ]}
            avatar={
              <Avatar
                src={reply.author.avatar_url}
                alt={reply.author.username}
              />
            }
            content={<p>{reply.content}</p>}
            datetime={
              <span>
                {dayjs(reply.created_at).format("MM-DD hh:mm")} 추천:
                {reply.likes}
              </span>
            }
          />
        );
      })}
    </>
  );
}

export default ArticleReplyComponent;
