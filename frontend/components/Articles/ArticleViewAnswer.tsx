import React, { Fragment } from "react";
import { Divider } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import nl2br from "react-nl2br";
import Cookies from "universal-cookie";
import { parseJwt, setVerifyToken } from "@utils/Cookies/TokenManager";

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
interface ArticleViewAnswerProps {
  id: number;
  answered: {
    count: number;
    next: string | null;
    previous: string | null;
    results: [AnswerProps];
  };
  answerMutate: (mutate: any, refresh: boolean) => void;
}
//* 답변 게시물
function ArticleViewAnswer({
  answerMutate,
  answered,
  id,
}: ArticleViewAnswerProps) {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");
  const expiredToken = parseJwt(accessToken);

  return (
    <>
      {answered?.results?.map((answer: AnswerProps, key: number) => {
        return (
          <Fragment key={key}>
            <Divider className="mt-2 mb-7 border-2" />
            <div className="flex items-center">
              <h3 className="text-xl">{answer.title}</h3>
              {/* eslint-disable */}
              <img
                className="rounded-full w-5 h-5 mr-1 ml-auto"
                src={answer.author.avatar_url}
                alt="avatar"
              />
              <div className="mr-1">{answer.author.username}</div>
              <div className="mr-1 ">
                <Divider type="vertical" className="border-[1px]" />
              </div>
              <div className=" mr-1">
                {dayjs(answer.created_at).format("MM-DD hh:mm")}
              </div>
              <div>추천 {answer.likes}</div>
            </div>
            <div className=" min-h-[35vh]">
              <p>{nl2br(answer.content)}</p>
            </div>
            <div className="flex items-center justify-center text-[24px]">
              {answer?.isLikes ? (
                <LikeFilled
                  onClick={async () => {
                    if (refreshToken) {
                      setVerifyToken(expiredToken);
                      answerMutate(async (likes: any) => {
                        const MyLike = likes.results.filter(
                          (like: any) => like.id === answer.id
                        );
                        return Object.assign({}, likes, {
                          results: likes.results.map((result: any) =>
                            result.id === answer.id
                              ? Object.assign({}, result, {
                                  isLikes: false,
                                  likes: MyLike[0].likes - 1,
                                })
                              : result
                          ),
                        });
                      }, false);
                      await axios.delete(
                        `${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/${id}/postComment/${answer.id}/like/`
                      );
                    } else {
                      alert("로그인이 필요합니다");
                    }
                  }}
                />
              ) : (
                <LikeOutlined
                  onClick={async () => {
                    if (refreshToken) {
                      setVerifyToken(expiredToken);
                      answerMutate((likes: any) => {
                        const MyLike = likes.results.filter(
                          (like: any) => like.id === answer.id
                        );

                        return Object.assign({}, likes, {
                          results: likes.results.map((result: any) =>
                            result.id === answer.id
                              ? Object.assign({}, result, {
                                  isLikes: true,
                                  likes: MyLike[0].likes + 1,
                                })
                              : result
                          ),
                        });
                      }, false);

                      await axios.post(
                        `${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/${id}/postComment/${answer.id}/like/`,
                        { ...answer }
                      );
                    } else {
                      alert("로그인이 필요합니다");
                    }
                  }}
                />
              )}
              {answer.likes}
            </div>
          </Fragment>
        );
      })}
    </>
  );
}

export default ArticleViewAnswer;
