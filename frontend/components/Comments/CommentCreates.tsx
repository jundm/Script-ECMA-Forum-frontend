import React, { Dispatch, SetStateAction, useState } from "react";
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
interface NewAnswerProps {
  author: {
    username: string;
    name: string;
  };
  content: string;
}
interface ArticleAnswerCreateProps {
  api: string;
  setReplyCreate?: Dispatch<SetStateAction<boolean>>;
}
// *validate 일단 사용 안함
function CommentCreate({ api, setReplyCreate }: ArticleAnswerCreateProps) {
  const [isLoading, setLoading] = useState(false);
  const accountUser = useSelector(userName);
  const accountUserName = accountUser.payload.auth.username;
  const accountName = accountUser.payload.auth.name;
  const router = useRouter();
  const cookies = new Cookies();
  // const { mutate } = useSWRConfig();
  const { data, error, mutate } = useFetch(api);
  console.log(data?.results, "api data");
  console.log(api, "api");
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
                {
                  ...data,
                  results: [
                    {
                      id: data.results.id + 1,
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
                    ...data.results,
                  ],
                },
                false
              );
              await axios
                .post(
                  `${process.env.NEXT_PUBLIC_ENV_BASE_URL}${api}`,
                  NewAnswer
                )
                .then(() => {
                  setLoading(false);
                  setReplyCreate && setReplyCreate(false);
                  values.content = "";
                });
              mutate();
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
