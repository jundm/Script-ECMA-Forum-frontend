import React, { useState } from "react";
import { Button, Input } from "antd";
import { Formik } from "formik";
import axios from "axios";
import { useSelector } from "react-redux";
import { userName } from "@utils/Toolkit/Slice/userSlice";
import { setVerifyToken } from "@utils/Cookies/TokenManager";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

interface NewAnswerProps {
  author: {
    username: string;
    name: string;
  };
  title: string;
  content: string;
}
interface ArticleAnswerCreateProps {
  answerMutate: (value: NewAnswerProps, check?: boolean) => void;
  id: number;
}
// *validate 일단 사용 안함
function CommentCreate({ id, answerMutate }: ArticleAnswerCreateProps) {
  const [isLoading, setLoading] = useState(false);
  const accountUser = useSelector(userName);
  const accountUserName = accountUser.payload.auth.username;
  const accountName = accountUser.payload.auth.name;
  const router = useRouter();
  const cookies = new Cookies();
  return (
    <div className="container">
      <Formik
        initialValues={{ title: "", content: "" }}
        validate={(values) => {}}
        onSubmit={async (values) => {
          try {
            setLoading(true);
            setVerifyToken();
            if (cookies.get("accessToken")) {
              const NewAnswer = {
                author: {
                  username: accountUserName,
                  name: accountName,
                },
                ...values,
              };
              answerMutate(NewAnswer, false);
              await axios
                .post(
                  `${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/${id}/comments/`,
                  NewAnswer
                )
                .then(() => {
                  setLoading(false);
                });
              answerMutate(NewAnswer);
            }
          } catch (e) {
            setLoading(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="댓글을 입력해주세요"
              allowClear
              showCount
              id="content"
              name="content"
              value={values.content}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Button
              className="mt-2"
              htmlType="submit"
              type="primary"
              shape="round"
              loading={isLoading}
            >
              댓글달기
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default CommentCreate;
