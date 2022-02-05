import React, { useEffect, useState } from "react";
import { Button, Card, Checkbox, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import {
  setAccessToken,
  setLogoutToken,
  setRefreshToken,
} from "@utils/Cookies/TokenManager";
import Link from "next/link";
// import { GetServerSideProps } from "next";
import Cookies from "universal-cookie";
import { userName } from "@utils/Toolkit/Slice/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

interface LoginProps {}

//TODO Remember me 적용
//TODO 효과적인 HOC 찾아보기
function Login() {
  const router = useRouter();
  const cookies = new Cookies();
  const acccountUser = useSelector(userName);
  const acccountUserName = acccountUser.payload.globalReducer.username;
  useEffect(() => {
    if (
      acccountUserName &&
      cookies.get("accessToken") &&
      cookies.get("refreshToken")
    ) {
      router.back();
    }
  }, [router.route]);
  const dispatch = useDispatch();
  const loginWidth = 300;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
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
        axios
          .get(process.env.NEXT_PUBLIC_ENV_BASE_URL + "users/me/")
          .then((res) => {
            dispatch(userName(res.data.username));
          })
          .catch((e) => console.warn(e.message));
      })
      .catch((e) => console.warn(e.message));
    setIsLoading(false);
    form.resetFields(["email", "password"]);
  };

  return (
    <Card
      title="Login"
      bordered={true}
      style={{ width: `${loginWidth + 50}px`, margin: "0 auto" }}
    >
      <Form
        name="normal_login"
        className="login-form w-96"
        initialValues={{ remember: true }}
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link href="">
            <a className="login-form-forgot" onClick={setLogoutToken}>
              비밀번호를 잊으셨나요?(토큰삭제)
            </a>
          </Link>
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
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const cookieReq = context.req ? context.req.headers.cookie : null;
//   const cookies = new Cookies(cookieReq);
//   const accessToken = cookies.get("accessToken");
//   const refreshToken = cookies.get("refreshToken");;
//   axios.defaults.headers.common["Authorization"] = `JWT ${accessToken}`;
//   try {
//     const me = await axios.get(
//       process.env.NEXT_PUBLIC_ENV_BASE_URL + "users/me/"
//     );
//     console.log(me.data, "미미미");
//   } catch {}
//   return { props: {} };
// };

export default Login;
