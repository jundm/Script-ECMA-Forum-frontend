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
  Div,
  UserNameDiv,
  ProfileDiv,
} from "./styles";

interface HeaderProps {
  // saveLocalStorage: () => void;
  setIsOpen: (arg: (isOpen: any) => boolean) => void;
}

const HeaderSmall = (props: HeaderProps) => {
  // const Uid = useSelector(loginUid);
  // const User = useSelector(loginUser);
  // const NickName = User.payload.userReducer.user;
  // const slug = Uid.payload.userReducer.uid;
  const toggleHeader = () => {
    props.setIsOpen((isOpen) => !isOpen);
    // props.saveLocalStorage();
  };
  const LogoSrc =
    "https://user-images.githubusercontent.com/80582578/150622884-8271a4f6-ed84-4a69-a8d4-08c4359e4d33.png";

  return (
    <>
      <HeaderOutLineSmall>
        <Div>
          <WidthDiv>
            <Logo src={LogoSrc} onClick={toggleHeader} />
            <MenuUl>
                <MenuLi>😎인기</MenuLi>
                <MenuLi>🙈질문</MenuLi>
                <MenuLi>😆소통</MenuLi>
                <MenuLi>🥳뉴스</MenuLi>
            </MenuUl>
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
        </Div>
      </HeaderOutLineSmall>
    </>
  );
};

export default HeaderSmall;
