import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Card,
} from "antd";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import { userName } from "@utils/Toolkit/Slice/userSlice";
import { GetServerSideProps } from "next";

//TODO 추가예정=[validator, add form, email인증]
interface SignUpProps {}

const loginWidth = 500;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 6,
    },
  },
};

function UserInfo(this: any, {}: SignUpProps) {
  const router = useRouter();
  const cookies = new Cookies();
  const accountUser = useSelector(userName);
  const accountUserName = accountUser.payload.auth.username;
  const accountName = accountUser.payload.auth.name;
  const accountEmail = accountUser.payload.auth.email;
  //*@param: email async-validator message remove {https://github.com/yiminghe/async-validator/issues/92}
  const warn = console.warn;
  console.warn = (...args: any[]) => {
    if (typeof args[0] === "string" && args[0].startsWith("async-validator:"))
      return;
    warn(...args);
  };
  useEffect(() => {
    if (!cookies.get("accessToken") && !cookies.get("refreshToken")) {
      router.back();
    }
  });

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: accountName,
    username: accountUserName,
    email: accountEmail,
    old_password: "",
    password: "",
    re_password: "",
  });
  const { name, username, email, old_password, password, re_password } = inputs;

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onFinish = async (value: any) => {
    setIsLoading(true);
    axios
      .post(process.env.NEXT_PUBLIC_ENV_BASE_URL + "users/set_password/", {
        new_password: password,
        re_new_password: re_password,
        current_password: old_password,
      })
      .then((res) => {
        form.resetFields(["old_password", "password", "re_password"]);
        router.push("/");
        alert("정보가 수정되었습니다!");
      })
      .catch((e) => {
        alert(e.message);
      });
    setIsLoading(false);
  };

  return (
    <div className="" style={{ margin: "auto" }}>
      <Card
        title="Update Info"
        bordered={true}
        style={{ width: `${loginWidth + 50}px`, margin: "0 auto" }}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            email: accountEmail,
            name: accountName,
            username: accountUserName,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="이메일"
            tooltip="중복체크 기능이 아직 없습니다. 본인 메일로 가입해주세요."
            rules={[
              {
                type: "email",
                message: "이메일 형식으로 입력하세요!",
              },
              {
                required: true,
                message: "이메일을 입력하세요!",
              },
            ]}
          >
            <Input name="email" onChange={onChange} value={email} disabled />
          </Form.Item>

          <Form.Item
            name="old_password"
            label="기존 비밀번호"
            rules={[
              {
                required: true,
                message: "비밀번호를 입력하세요!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              name="old_password"
              onChange={onChange}
              value={old_password}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="비밀번호"
            rules={[
              {
                required: true,
                message: "비밀번호를 입력하세요!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              name="password"
              onChange={onChange}
              value={password}
            />
          </Form.Item>

          <Form.Item
            name="re_password"
            label="비밀번호 확인"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "비밀번호를 확인 하세요!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              name="re_password"
              onChange={onChange}
              value={re_password}
            />
          </Form.Item>

          <Form.Item
            name="name"
            label="실명"
            tooltip="사용자의 이름을 기입합니다."
            rules={[
              {
                required: true,
                message: "실명을 입력하세요!",
                whitespace: false,
              },
            ]}
          >
            <Input name="name" onChange={onChange} value={name} disabled />
          </Form.Item>
          <Form.Item
            name="username"
            label="닉네임"
            tooltip="닉네임을 사용 합니다(중복 불가)"
            rules={[
              {
                required: true,
                message: "닉네임을 입력하세요!",
                whitespace: true,
              },
            ]}
          >
            <Input
              name="username"
              onChange={onChange}
              value={username}
              disabled
            />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" disabled={isLoading}>
              {isLoading ? "정보수정중.." : "정보수정"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookieReq = context.req ? context.req.headers.cookie : null;
  const cookies = new Cookies(cookieReq);
  const refreshToken = cookies.get("refreshToken");
  const resolvedUrl = context.resolvedUrl;
  if (refreshToken) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        destination: resolvedUrl.slice(0, -7),
        permanent: false,
      },
    };
  }
};
export default UserInfo;
