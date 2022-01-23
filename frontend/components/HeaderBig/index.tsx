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
                <LoginSignUp>😘로그인</LoginSignUp>
                <LoginSignUp>🥰회원가입</LoginSignUp>
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
          <MenuLi>😎인기</MenuLi>
          <MenuLi>🙈질문</MenuLi>
          <MenuLi>😆소통</MenuLi>
          <MenuLi>🥳뉴스</MenuLi>
        </MenuUl>
      </HeaderOutLineBig>
    </>
  );
};

export default HeaderBig;
