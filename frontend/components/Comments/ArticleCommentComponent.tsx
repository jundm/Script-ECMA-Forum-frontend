import axios from "axios";
import React, { useState } from "react";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { Avatar, Comment } from "antd";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import CommentCreate from "./CommentCreates";
import ArticleReplyComponent from "./ArticleReplyComponent";
import { KeyedMutator } from "swr";
import Cookies from "universal-cookie";
import { parseJwt, setVerifyToken } from "@utils/Cookies/TokenManager";

interface ArticleCommentComponentProps {
  comments: CommentProps;
  mutate: KeyedMutator<any>;
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

function ArticleCommentComponent({
  comments,
  mutate,
}: ArticleCommentComponentProps) {
  const router = useRouter();
  const [replyCreate, setReplyCreate] = useState(false);
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");
  const expiredToken = parseJwt(accessToken);

  return (
    <>
      <Comment
        actions={[
          <>
            <div className="flex">
              {comments.isLikes ? (
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
                    } else {
                      alert("로그인이 필요합니다");
                    }
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
    </>
  );
}

export default ArticleCommentComponent;
