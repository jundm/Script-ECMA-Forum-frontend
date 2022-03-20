import { Avatar, Comment } from "antd";
import { LikeOutlined, LikeFilled, EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import dayjs from "dayjs";
import CommentCreate from "./CommentCreates";
import ArticleReplyComponent from "./ArticleReplyComponent";
import useFetch from "@utils/Hook/useFetch";

interface ArticleCommentComponentProps {
  key: number;
  comments: {
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
  };
}

function ArticleCommentComponent({
  key,
  comments,
}: ArticleCommentComponentProps) {
  const [replyCreate, setReplyCreate] = useState(false);

  return (
    <>
      <Comment
        key={key}
        actions={[
          <>
            <div className="flex items-center">
              <LikeOutlined />
              <span
                key={key}
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
        {replyCreate && (
          <CommentCreate
            api={`posts/api/${comments.id}/commentsReply/`}
            setReplyCreate={setReplyCreate}
          />
        )}

        <ArticleReplyComponent id={comments.id} />
      </Comment>
    </>
  );
}

export default ArticleCommentComponent;
