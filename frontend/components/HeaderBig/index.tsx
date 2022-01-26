import {
  HeaderOutLineBig,
  MenuLi,
  MenuUl,
  Logo,
  AuthenticationDiv,
  WidthDiv,
  Div,
  FaceDiv,
  LoginSignUp,
  FaceMessageDiv,
  HeaderLoginDiv,
  UserNameDiv,
  ProfileDiv,
  Logout,
  // HeaderLink,
} from "./styles";
import React from "react";
import Link from "next/link";
// import { useSelector } from "react-redux";
// import { loginUid, loginUser } from "@/utils/Toolkit/Slice/userSlice";

interface HeaderProps {
  // saveLocalStorage: () => void;
  setIsOpen: (arg: (isOpen: any) => boolean) => void;
}

const HeaderBig = (props: HeaderProps) => {
  const toggleHeader = () => {
    props.setIsOpen((isOpen) => !isOpen);
  };
  const LogoSrc =
    "https://user-images.githubusercontent.com/80582578/150622621-619d3778-7717-4455-9093-60e0be731da5.png";

  return (
    <>
      <HeaderOutLineBig>
        <WidthDiv>
          <AuthenticationDiv>
            {false ? (
              <>
                <HeaderLoginDiv>
                  <UserNameDiv>NickName</UserNameDiv>
                  <ProfileDiv>님😍</ProfileDiv>
                  <Logout>logout</Logout>
                </HeaderLoginDiv>
              </>
            ) : (
              <>
                <Link href="/accounts/login">
                  <a>
                    <LoginSignUp>😘로그인</LoginSignUp>
                  </a>
                </Link>
                <Link href="/accounts/signup">
                  <a>
                    <LoginSignUp>🥰회원가입</LoginSignUp>
                  </a>
                </Link>
              </>
            )}
          </AuthenticationDiv>
        </WidthDiv>
        <Div>
          <Logo src={LogoSrc} />
          <FaceDiv onClick={toggleHeader} />
          <FaceMessageDiv>👈 응슷곰을 누르면 메뉴가 접혀요! </FaceMessageDiv>
        </Div>
        <MenuUl>
          <Link href="/article/hot">
            <a>
              <MenuLi>😎인기</MenuLi>
            </a>
          </Link>
          <Link href="/article/question">
            <a>
              <MenuLi>🙈질문</MenuLi>
            </a>
          </Link>
          <Link href="/article/free">
            <a>
              <MenuLi>😆소통</MenuLi>
            </a>
          </Link>
          <Link href="/article/news">
            <a>
              <MenuLi>🥳뉴스</MenuLi>
            </a>
          </Link>
        </MenuUl>
      </HeaderOutLineBig>
    </>
  );
};

export default HeaderBig;
