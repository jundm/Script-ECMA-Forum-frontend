import { Avatar, Comment, Divider, Button } from "antd";
import { LikeOutlined, LikeFilled, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import React from "react";

interface ArticleCommentProps {}

function ArticleComment({}: ArticleCommentProps) {
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
    <div>
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
        datetime={<span>02-24 10:12</span>}
        // datetime={<span>{dayjs(data?.created_at).format("MM-DD hh:mm")}</span>}
      >
        <Comment
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
            <span>02-24 10:12</span>
            // <span>{dayjs(data?.created_at).format("MM-DD hh:mm")}</span>
          }
        />
      </Comment>
      <Divider className="border-[1px]" />
    </div>
  );
}

export default ArticleComment;
