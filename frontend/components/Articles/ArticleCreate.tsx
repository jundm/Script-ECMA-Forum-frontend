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

interface ArticleCreateProps {
  category: string;
}

// *validate 일단 사용 안함
function ArticleCreate({ category }: ArticleCreateProps) {
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
        onSubmit={(values) => {
          setLoading(true);
          setVerifyToken();
          const createArticle = axios
            .post(`${process.env.NEXT_PUBLIC_ENV_BASE_URL}posts/api/`, {
              category,
              author: {
                username: { accountUserName },
                name: { accountName },
              },
              ...values,
            })
            .then((res) => {
              router.push(`/articles/${category}`);
            })
            .catch((e) => {
              setLoading(false);
            });
          if (cookies.get("accessToken")) {
            createArticle;
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
              placeholder="내용을 입력해 주세요{태그넣기 ex)#응슷곰}"
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
              제출하기
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default ArticleCreate;
