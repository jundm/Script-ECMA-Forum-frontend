import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { setLoginToken } from "@utils/Cookies/TokenManager";

interface LoginProps {}

function Login({}: LoginProps) {
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
      .post("http://localhost:8000/jwt/create/", {
        email,
        password,
      })
      .then((res) => {
        const accessToken = res.data.access;
        const refreshToken = res.data.refresh;
        console.log(res.data);
        setLoginToken(accessToken, refreshToken);
      })
      .catch((e) => console.warn(e.message));
    setIsLoading(false);
    form.resetFields(["email", "password"]);
  };

  return (
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
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          비밀번호를 잊으셨나요?
        </a>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          disabled={isLoading}
        >
          Log in
        </Button>
        Or <a href="">지금 회원가입하기!</a>
      </Form.Item>
    </Form>
  );
}

export default Login;
