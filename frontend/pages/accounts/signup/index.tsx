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
import { userName } from "@utils/Toolkit/Slice/globalSlice";
import { GetServerSideProps } from "next";

//TODO 추가예정=[validator, add form, email인증]
interface SignUpProps {}

const loginWidth = 500;
const { Option } = Select;
// *! 지역
// const residences = [
//   {
//     value: "zhejiang",
//     label: "Zhejiang",
//     children: [
//       {
//         value: "hangzhou",
//         label: "Hangzhou",
//         children: [
//           {
//             value: "xihu",
//             label: "West Lake",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     value: "jiangsu",
//     label: "Jiangsu",
//     children: [
//       {
//         value: "nanjing",
//         label: "Nanjing",
//         children: [
//           {
//             value: "zhonghuamen",
//             label: "Zhong Hua Men",
//           },
//         ],
//       },
//     ],
//   },
// ];

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

function SignUp(this: any, {}: SignUpProps) {
  console.log("회원가입");
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
  });
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    re_password: "",
  });
  const { name, username, email, password, re_password } = inputs;
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
      .post(process.env.NEXT_PUBLIC_ENV_BASE_URL + "users/", {
        name,
        username,
        email,
        password,
        re_password,
      })
      .then((res) => {
        console.log(res);
        form.resetFields([
          "email",
          "name",
          "username",
          "password",
          "re_password",
        ]);
      })
      .catch((e) => console.warn(e.message));
    setIsLoading(false);
  };

  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select style={{ width: 70 }}>
  //       <Option value="82">+82</Option>
  //     </Select>
  //   </Form.Item>
  // );

  // const suffixSelector = (
  //   <Form.Item name="suffix" noStyle>
  //     <Select style={{ width: 70 }}>
  //       <Option value="USD">$</Option>
  //       <Option value="CNY">¥</Option>
  //     </Select>
  //   </Form.Item>
  // );

  // const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  // const onWebsiteChange = (value: string) => {
  //   if (!value) {
  //     setAutoCompleteResult([]);
  //   } else {
  //     setAutoCompleteResult(
  //       [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
  //     );
  //   }
  // };

  // const websiteOptions = autoCompleteResult.map((website) => ({
  //   label: website,
  //   value: website,
  // }));

  return (
    <div className="" style={{ margin: "auto" }}>
      <Card
        title="SignUp"
        bordered={true}
        style={{ width: `${loginWidth + 50}px`, margin: "0 auto" }}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="이메일"
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
            <Input name="email" onChange={onChange} value={email} />
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
            tooltip="주민등록상 실제 이름을 기입합니다."
            rules={[
              {
                required: true,
                message: "실명을 입력하세요!",
                whitespace: false,
              },
            ]}
          >
            <Input name="name" onChange={onChange} value={name} />
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
            <Input name="username" onChange={onChange} value={username} />
          </Form.Item>

          {/* 지역 */}
          {/* <Form.Item
          name="residence"
          label="Habitual Residence"
          rules={[
            {
              type: "array",
              required: true,
              message: "Please select your habitual residence!",
            },
          ]}
        >
          <Cascader options={residences} />
        </Form.Item> */}

          {/* <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item> */}

          {/* <Form.Item
          name="donation"
          label="Donation"
          rules={[{ required: true, message: "Please input donation amount!" }]}
        >
          <InputNumber addonAfter={suffixSelector} style={{ width: "100%" }} />
        </Form.Item> */}

          {/* <Form.Item
          name="website"
          label="Website"
          rules={[{ required: true, message: "Please input website!" }]}
        >
          <AutoComplete
            options={websiteOptions}
            onChange={onWebsiteChange}
            placeholder="website"
          >
            <Input />
          </AutoComplete>
        </Form.Item> */}

          {/* <Form.Item
          name="intro"
          label="Intro"
          rules={[{ required: true, message: "Please input Intro" }]}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item> */}

          {/* <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item> */}

          {/* <Form.Item
          label="Captcha"
          extra="We must make sure that your are a human."
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please input the captcha you got!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item> */}

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              <a href="">약관에 동의합니다.</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" disabled={isLoading}>
              {isLoading ? "회원가입중.." : "회원가입"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const cookieReq = context.req ? context.req.headers.cookie : null;
//   const cookies = new Cookies(cookieReq);
//   const accessToken = cookies.get("accessToken");
//   if (accessToken) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   } else {
//     return {
//       props: {},
//     };
//   }
// };
export default SignUp;
