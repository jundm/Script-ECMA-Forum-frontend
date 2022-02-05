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
} from "./styles";
import React from "react";
import Link from "next/link";
import Smiling from "public/svg/Smiling With Closed Eyes Emoji.svg";
import Smile from "public/svg/Smile Emoji With Hearts.svg";
import Blow from "public/svg/Blow Kiss Emoji.svg";
import Mongkey from "public/svg/Mongkey.svg";
import Party from "public/svg/Party Face Emoji.svg";
import Sunglasses from "public/svg/Sunglasses Emoji.svg";
import Heart from "public/svg/Heart Eyes Emoji.svg";
import { useDispatch, useSelector } from "react-redux";
import { userName } from "@utils/Toolkit/Slice/globalSlice";
import { setLogoutToken } from "@utils/Cookies/TokenManager";

interface HeaderProps {
  setIsOpen: (arg: (isOpen: any) => boolean) => void;
  isSafari: boolean;
}

//TODO 토큰이 전부 만료 됐을때 어떻게 처리할지 생각해보기 (일단은 생각할 필요 없음)
const HeaderBig = (props: HeaderProps) => {
  const dispatch = useDispatch();
  const acccountUser = useSelector(userName);
  const acccountUserName = acccountUser.payload.globalReducer.username;
  const toggleHeader = () => {
    props.setIsOpen((isOpen) => !isOpen);
  };
  const LogoSrc =
    "https://user-images.githubusercontent.com/80582578/150622621-619d3778-7717-4455-9093-60e0be731da5.png";

  const Safari = props.isSafari;
  const onLogout = () => {
    dispatch(userName("")), setLogoutToken();
  };

  return (
    <>
      <HeaderOutLineBig>
        <WidthDiv>
          <AuthenticationDiv>
            {acccountUserName ? (
              <>
                <HeaderLoginDiv>
                  <UserNameDiv>{acccountUserName}</UserNameDiv>
                  <ProfileDiv>님{Safari ? "😍" : <Heart />}</ProfileDiv>
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
          <FaceMessageDiv>👈 응슷곰을 누르면 메뉴가 접혀요! </FaceMessageDiv>
        </Div>
        <MenuUl>
          <Link href="/article/hot">
            <a>
              <MenuLi>
                {Safari ? "😎" : <Sunglasses />}
                인기
              </MenuLi>
            </a>
          </Link>
          <Link href="/article/question">
            <a>
              <MenuLi>
                {Safari ? "🙈" : <Mongkey />}
                질문
              </MenuLi>
            </a>
          </Link>
          <Link href="/article/free">
            <a>
              <MenuLi>
                {Safari ? "😆" : <Smiling />}
                소통
              </MenuLi>
            </a>
          </Link>
          <Link href="/article/news">
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
