import React, { useState } from "react";
import { Button, Input } from "antd";
import { Formik } from "formik";
import axios from "axios";
import { useSelector } from "react-redux";
import { userName } from "@utils/Toolkit/Slice/userSlice";
import { setVerifyToken } from "@utils/Cookies/TokenManager";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

const { TextArea } = Input;

interface AnswerProps {
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
}
interface NewAnswerProps {
  author: {
    username: string;
    name: string;
  };
  title: string;
  content: string;
}
interface ArticleAnswerCreateProps {
  // answerMutate: (value: NewAnswerProps, check?: boolean) => void;
  answerMutate: any;
  id: number;
  setAnswer: (arg: (answer: boolean) => boolean) => void;
  answered: any;
  // answered: AnswerProps;
}
// *validate 일단 사용 안함
function ArticleAnswerCreate({
  id,
  setAnswer,
  answerMutate,
  answered,
}: ArticleAnswerCreateProps) {
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
              answerMutate(
                {
                  ...answered,
                  results: [
                    {
                      id: answered.results.id + 1,
                      author: {
                        username: accountUserName,
                        name: accountName,
                        avatar_url: `${process.env.NEXT_PUBLIC_ENV_BASE_URL}avatar/image/${accountUserName}.png`,
                      },
                      likes: 0,
                      created_at: Date.now(),
                      updated_at: Date.now(),
                      ...values,
                    },
                    ...answered.results,
                  ],
                },
                false
              );
              await axios.post(
                `${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/${router.query.id}/postComment/`,
                NewAnswer
              );
              answerMutate();
              setAnswer((answer) => !answer);
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
