import { Avatar, Comment, Divider, Button } from "antd";
import { LikeOutlined, LikeFilled, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import React, { useState } from "react";
import useFetch from "@utils/Hook/useFetch";
import { useRouter } from "next/router";

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
  const [reply, setReply] = useState(false);
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
        return (
          <Comment
            key={key}
            actions={[
              <>
                <div className="flex items-center">
                  <LikeOutlined />
                  <span key={key} className="ml-1" onClick={() => {}}>
                    Reply to
                  </span>
                </div>
              </>,
            ]}
            author={<a>{comments.author.username}</a>}
            avatar={
              <Avatar
                src={comments.author.avatar_url}
                alt={comments.author.username}
              />
            }
            content={<p>{comments.content}</p>}
            datetime={
              <span>
                {dayjs(comments.updated_at).format("MM-DD hh:mm")} 추천:
                {comments.likes}
              </span>
            }
          >
            <Comment
              author={<a>Han Solo</a>}
              avatar={
                <Avatar
                  src="https://joeschmoe.io/api/v1/random"
                  alt="Han Solo"
                />
              }
              content={
                <p>
                  We supply a series of design principles, practical patterns
                  and high quality design resources (Sketch and Axure), to help
                  people create their product prototypes beautifully and
                  efficiently.
                </p>
              }
              datetime={
                <span>02-24 10:12</span>
                // <span>{dayjs(data?.created_at).format("MM-DD hh:mm")}</span>
              }
            />
          </Comment>
        );
      })}
    </>
  );
}

export default ArticleComment;
