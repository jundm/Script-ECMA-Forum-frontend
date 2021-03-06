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
  WrapperUser,
} from "./styles";
import React from "react";
import Link from "next/link";
import Smiling from "public/svg/Smiling With Closed Eyes Emoji.svg";
import Smile from "public/svg/Smile Emoji With Hearts.svg";
import Blow from "public/svg/Blow Kiss Emoji.svg";
import Monkey from "public/svg/Monkey.svg";
import Party from "public/svg/Party Face Emoji.svg";
import Sunglasses from "public/svg/Sunglasses Emoji.svg";
import Heart from "public/svg/Heart Eyes Emoji.svg";
import Pointing from "public/svg/Pointing Index Emoji.svg";
import { name, userName } from "@utils/Toolkit/Slice/userSlice";
import { setLogoutToken } from "@utils/Cookies/TokenManager";
import { useAppDispatch, useAppSelector } from "@utils/Toolkit/hook";

interface HeaderProps {
  setIsOpen: (arg: (isOpen: any) => boolean) => void;
  isSafari: boolean;
}

const HeaderBig = (props: HeaderProps) => {
  const dispatch = useAppDispatch();
  const accountUser = useAppSelector(userName);
  const accountUserName = accountUser.payload.auth.username;

  const toggleHeader = () => {
    props.setIsOpen((isOpen) => !isOpen);
  };
  const LogoSrc =
    "https://user-images.githubusercontent.com/80582578/150622621-619d3778-7717-4455-9093-60e0be731da5.png";
  const Safari = props.isSafari;
  const onLogout = () => {
    dispatch(userName("")), dispatch(name("")), setLogoutToken();
  };

  return (
    <>
      <HeaderOutLineBig>
        <WidthDiv>
          <AuthenticationDiv>
            {accountUserName ? (
              <>
                <HeaderLoginDiv>
                  <Link href="/accounts/userinfo">
                    <WrapperUser>
                      <UserNameDiv>{accountUserName}</UserNameDiv>
                      <ProfileDiv>님 {Safari ? "😍" : <Heart />}</ProfileDiv>
                    </WrapperUser>
                  </Link>
                  <Logout onClick={onLogout}>logout</Logout>
                </HeaderLoginDiv>
              </>
            ) : (
              <>
                <Link href="/accounts/login">
                  <a>
                    <LoginSignUp>
                      {Safari ? "😘" : <Blow />}
                      로그인
                    </LoginSignUp>
                  </a>
                </Link>
                <Link href="/accounts/signup">
                  <a>
                    <LoginSignUp>
                      {Safari ? "🥰" : <Smile />}
                      회원가입
                    </LoginSignUp>
                  </a>
                </Link>
              </>
            )}
          </AuthenticationDiv>
        </WidthDiv>
        <Div>
          <Logo src={LogoSrc} />
          <FaceDiv onClick={toggleHeader} />
          <FaceMessageDiv>
            {Safari ? "👈" : <Pointing />} 응슷곰을 누르면 메뉴가 접혀요!
          </FaceMessageDiv>
        </Div>
        <MenuUl>
          <Link href="/articles/hot">
            <a>
              <MenuLi>
                {Safari ? "😎" : <Sunglasses />}
                인기
              </MenuLi>
            </a>
          </Link>
          <Link href="/articles/question">
            <a>
              <MenuLi>
                {Safari ? "🙈" : <Monkey />}
                질문
              </MenuLi>
            </a>
          </Link>
          <Link href="/articles/free">
            <a>
              <MenuLi>
                {Safari ? "😆" : <Smiling />}
                소통
              </MenuLi>
            </a>
          </Link>
          <Link href="/articles/news">
            <a>
              <MenuLi>
                {Safari ? "🥳" : <Party />}
                뉴스
              </MenuLi>
            </a>
          </Link>
        </MenuUl>
      </HeaderOutLineBig>
    </>
  );
};

export default HeaderBig;
