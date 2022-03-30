import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { setAccessToken, setRefreshToken } from "@utils/Cookies/TokenManager";
import Link from "next/link";
import Cookies from "universal-cookie";
import { userName } from "@utils/Toolkit/Slice/userSlice";
import { useRouter } from "next/router";
import { globalRemember, globalEmail } from "@utils/Toolkit/Slice/globalSlice";
import { useAppDispatch, useAppSelector } from "@utils/Toolkit/hook";

interface LoginProps {}

function Login() {
  const router = useRouter();
  const cookies = new Cookies();
  const accountUser = useAppSelector(userName);
  const accountUserName = accountUser.payload.auth.username;
  let rememberUser = useAppSelector(globalRemember);
  let rememberUserEmail = rememberUser.payload.global.remember;
  let rememberEmail = useAppSelector(globalEmail);
  let rememberEmailInput = rememberEmail.payload.global.userEmail;

  useEffect(() => {
    if (
      accountUserName &&
      cookies.get("accessToken") &&
      cookies.get("refreshToken")
    ) {
      router.back();
    }
  });
  const dispatch = useAppDispatch();
  const loginWidth = 300;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: rememberEmailInput,
    password: "",
  });

  const { email, password } = inputs;
  //*@param: email async-validator message remove {https://github.com/yiminghe/async-validator/issues/92}
  const warn = console.warn;
  console.warn = (...args: any[]) => {
    if (typeof args[0] === "string" && args[0].startsWith("async-validator:"))
      return;
    warn(...args);
  };
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onFinish = (values: any) => {
    setIsLoading(true);
    axios
      .post(process.env.NEXT_PUBLIC_ENV_BASE_URL + "jwt/create/", {
        email,
        password,
      })
      .then((res) => {
        const access = res.data.access;
        const refresh = res.data.refresh;
        setAccessToken(access);
        setRefreshToken(refresh);
        router.push("/");
        if (rememberUserEmail === true) {
          dispatch(globalEmail(email));
        }
      })
      .catch((e) => alert("이메일 혹은 비밀번호가 잘못 되었습니다"));
    setIsLoading(false);
    form.resetFields(["email", "password"]);
  };
  const onClickChecked = () => {
    dispatch(globalRemember(!rememberUserEmail));
  };
  useEffect(() => {
    if (rememberUserEmail === false) {
      dispatch(globalEmail(""));
    }
  }, [rememberUserEmail]);
  return (
    <Card
      title="Login"
      bordered={true}
      style={{ width: `${loginWidth + 50}px`, margin: "0 auto" }}
    >
      <Form
        name="normal_login"
        className="login-form w-96"
        initialValues={{ email: rememberEmailInput }}
        onFinish={onFinish}
        style={{ margin: "auto" }}
        form={form}
      >
        <Form.Item
          name="email"
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
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="이메일"
            name="email"
            onChange={onChange}
            value={email}
            style={{ width: loginWidth }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="비밀번호"
            name="password"
            onChange={onChange}
            value={password}
            style={{ width: loginWidth }}
          />
        </Form.Item>
        <Form.Item>
          <div onClick={onClickChecked} className="cursor-pointer">
            <input
              className="mr-1"
              type="checkbox"
              name=""
              id=""
              checked={rememberUserEmail}
              readOnly
            />
            Remember me
          </div>
          {/* //TODO */}
          {/* <Link href="">
            <a className="login-form-forgot" onClick={() => {}}>
              비밀번호를 잊으셨나요?
            </a>
          </Link> */}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={isLoading}
            style={{ width: "78%" }}
          >
            Log in
          </Button>
          <br />
          <Link href="/accounts/signup">
            <a>지금 회원가입하기!</a>
          </Link>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Login;
