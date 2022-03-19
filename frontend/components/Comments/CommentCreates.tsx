import React, { useState } from "react";
import { Button, Input } from "antd";
import { Formik } from "formik";
import axios from "axios";
import { useSelector } from "react-redux";
import { userName } from "@utils/Toolkit/Slice/userSlice";
import { setVerifyToken } from "@utils/Cookies/TokenManager";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { useSWRConfig } from "swr";

const { TextArea } = Input;
interface NewAnswerProps {
  author: {
    username: string;
    name: string;
  };
  content: string;
}
interface ArticleAnswerCreateProps {}
// *validate 일단 사용 안함
function CommentCreate({}: ArticleAnswerCreateProps) {
  const [isLoading, setLoading] = useState(false);
  const accountUser = useSelector(userName);
  const accountUserName = accountUser.payload.auth.username;
  const accountName = accountUser.payload.auth.name;
  const router = useRouter();
  const cookies = new Cookies();
  const { mutate } = useSWRConfig();

  return (
    <div className="container">
      <Formik
        initialValues={{ content: "" }}
        validate={(values) => {}}
        onSubmit={async (values) => {
          try {
            if (cookies.get("accessToken") && values.content !== "") {
              setLoading(true);
              setVerifyToken();
              const NewAnswer = {
                author: {
                  username: accountUserName,
                  name: accountName,
                },
                ...values,
              };
              mutate(
                `posts/api/${router.query.id}/comments/`,
                [, NewAnswer],
                false
              );
              await axios
                .post(
                  `${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/${router.query.id}/comments/`,
                  NewAnswer
                )
                .then(() => {
                  setLoading(false);
                  values.content = "";
                });
              mutate(`posts/api/${router.query.id}/comments/`, NewAnswer);
            } else {
              setLoading(false);
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
            <TextArea
              placeholder="댓글을 입력해주세요(Shift+Enter)"
              allowClear
              showCount
              id="content"
              name="content"
              value={values.content}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyPress={(e) => {
                if (e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
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
