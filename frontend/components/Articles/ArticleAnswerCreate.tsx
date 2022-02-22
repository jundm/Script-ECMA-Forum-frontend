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
import useFetch from "@utils/Hook/useFetch";

const { TextArea } = Input;

interface ArticleAnswerCreateProps {
  category: string;
  id: number;
  setAnswer: (arg: (answer: boolean) => boolean) => void;
  answered: {
    author: {
      avatar_url: string;
      name: string;
      username: string;
    };
    category: string;
    comment: number;
    content: string;
    hit: number;
    id: number;
    isLikes: boolean;
    likes: number;
    tag_set: [];
    title: string;
    created_at: string;
    updated_at: string;
  };
}

// *validate 일단 사용 안함
function ArticleAnswerCreate({
  category,
  id,
  setAnswer,
}: // answered,
ArticleAnswerCreateProps) {
  const [isLoading, setLoading] = useState(false);
  const accountUser = useSelector(userName);
  const accountUserName = accountUser.payload.auth.username;
  const accountName = accountUser.payload.auth.name;
  const router = useRouter();
  const cookies = new Cookies();
  // const { mutate } = useSWRConfig();
  const {
    data: answered,
    error: answeredError,
    mutate,
  } = useFetch(`posts/api/${id}/postComment`);

  return (
    <div className="container">
      <Formik
        initialValues={{ title: "", content: "" }}
        validate={(values) => {}}
        onSubmit={(values) => {
          // setLoading(true);
          // setVerifyToken();

          // if (cookies.get("accessToken")) {
          //   const NewAnswer = {
          //     author: {
          //       username: accountUserName,
          //       name: accountName,
          //     },
          //     ...values,
          //   };
          //   mutate(NewAnswer, false);
          //   // axios
          //   //   .post(
          //   //     `${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/${id}/postComment/`,
          //   //     { NewAnswer }
          //   //   )
          //   //   .then((res) => {
          //   //     setAnswer((answer) => !answer);
          //   //     // router.push(`/articles/${category}/${id}`);
          //   //   })
          //   //   .catch((e) => {
          //   //     setLoading(false);
          //   //   });
          //   // mutate(`posts/api/${id}/postComment/`);
          // }
          if (cookies.get("accessToken")) {
            const createArticle = axios
              .post(
                `${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/${id}/postComment/`,
                {
                  author: {
                    username: accountUserName,
                    name: accountName,
                  },
                  ...values,
                }
              )
              .then((res) => {
                setAnswer((answer) => !answer);
                // router.push(`/articles/${category}/${id}`);
              })
              .catch((e) => {
                setLoading(false);
              });
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
            <label htmlFor="title">제목</label>
            <Input
              placeholder="제목을 입력해 주세요"
              allowClear
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ marginBottom: "20px" }}
            />
            <label htmlFor="content">내용</label>
            <TextArea
              placeholder="답변을 입력해주세요"
              allowClear
              showCount
              id="content"
              name="content"
              value={values.content}
              onChange={handleChange}
              onBlur={handleBlur}
              autoSize={{ minRows: 5, maxRows: 5 }}
            />
            <br />
            <Button
              htmlType="submit"
              type="primary"
              shape="round"
              loading={isLoading}
            >
              답변하기
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default ArticleAnswerCreate;
