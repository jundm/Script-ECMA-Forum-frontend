import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import {
  HeaderOutLineSmall,
  MenuLi,
  Logo,
  WidthDiv,
  LoginSignUp,
  ProfileDiv,
  UserNameDiv,
} from "./styles";
import Smiling from "public/svg/Smiling With Closed Eyes Emoji.svg";
import Blow from "public/svg/Blow Kiss Emoji.svg";
import Mongkey from "public/svg/Mongkey.svg";
import Party from "public/svg/Party Face Emoji.svg";
import Sunglasses from "public/svg/Sunglasses Emoji.svg";
import Heart from "public/svg/Heart Eyes Emoji.svg";
import { userName } from "@utils/Toolkit/Slice/globalSlice";

interface HeaderProps {
  setIsOpen: (arg: (isOpen: any) => boolean) => void;
  isSafari: boolean;
}

const HeaderSmall = (props: HeaderProps) => {
  const acccountUser = useSelector(userName);
  const acccountUserName = acccountUser.payload.globalReducer.username;
  const toggleHeader = () => {
    props.setIsOpen((isOpen) => !isOpen);
  };
  const LogoSrc =
    "https://user-images.githubusercontent.com/80582578/150622884-8271a4f6-ed84-4a69-a8d4-08c4359e4d33.png";
  const Safari = props.isSafari;
  return (
    <>
      <HeaderOutLineSmall>
        <WidthDiv>
          <Logo src={LogoSrc} onClick={toggleHeader} />
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
                {Safari ? "🙈" : <Mongkey />}
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

          {acccountUserName ? (
            <>
              <UserNameDiv>
                {acccountUserName.slice(0, 2)}
                <ProfileDiv>님{Safari ? "😍" : <Heart />}</ProfileDiv>
              </UserNameDiv>
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
            </>
          )}
        </WidthDiv>
      </HeaderOutLineSmall>
    </>
  );
};

export default HeaderSmall;
