// import { loginUid, loginUser } from "@/utils/Toolkit/Slice/userSlice";
import React from "react";
// import { useSelector } from "react-redux";
import {
  HeaderOutLineSmall,
  MenuLi,
  MenuUl,
  Logo,
  WidthDiv,
  LoginSignUp,
  UserNameDiv,
  ProfileDiv,
} from "./styles";

interface HeaderProps {
  setIsOpen: (arg: (isOpen: any) => boolean) => void;
}

const HeaderSmall = (props: HeaderProps) => {
  const toggleHeader = () => {
    props.setIsOpen((isOpen) => !isOpen);
  };
  const LogoSrc =
    "https://user-images.githubusercontent.com/80582578/150622884-8271a4f6-ed84-4a69-a8d4-08c4359e4d33.png";

  return (
    <>
      <HeaderOutLineSmall>
          <WidthDiv>
            <Logo src={LogoSrc} onClick={toggleHeader} />
              <MenuLi>😎인기</MenuLi>
              <MenuLi>🙈질문</MenuLi>
              <MenuLi>😆소통</MenuLi>
              <MenuLi>🥳뉴스</MenuLi>

            {false ? (
              <>
                {/*<UserNameDiv>{NickName.slice(0, 2)}</UserNameDiv>*/}
                <ProfileDiv>님😍</ProfileDiv>
              </>
            ) : (
              <>
                <LoginSignUp>😘로그인</LoginSignUp>
              </>
            )}
          </WidthDiv>
      </HeaderOutLineSmall>
    </>
  );
};

export default HeaderSmall;
