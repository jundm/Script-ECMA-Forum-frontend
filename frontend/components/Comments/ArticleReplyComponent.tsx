import { Avatar, Comment } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { LikeOutlined, LikeFilled, EditOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import useFetch from "@utils/Hook/useFetch";
import { setVerifyToken } from "@utils/Cookies/TokenManager";

interface ArticleReplyComponentProps {
  id: number;
}

function ArticleReplyComponent({ id }: ArticleReplyComponentProps) {
  const { data, error, mutate } = useFetch(`posts/api/${id}/commentsReply/`);
  useEffect(() => {
    if (error) {
      setVerifyToken();
      // console.error(error.message);
    }
  }, [error, data]);
  return (
    <>
      {data?.results?.map((reply: any, key: number) => {
        return (
          <Comment
            key={key}
            author={<a>{reply.author.username}</a>}
            actions={[
              <>
                <div className="flex items-center">
                  <LikeOutlined />
                  <span className="ml-1 cursor-pointer">like</span>
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
