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
}

const HeaderSmall = (props: HeaderProps) => {
  const acccountUser = useSelector(userName);
  const acccountUserName = acccountUser.payload.globalReducer.username;
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
          <Link href="/article/hot">
            <a>
              <MenuLi>
                <Sunglasses />
                인기
              </MenuLi>
            </a>
          </Link>
          <Link href="/article/question">
            <a>
              <MenuLi>
                <Mongkey />
                질문
              </MenuLi>
            </a>
          </Link>
          <Link href="/article/free">
            <a>
              <MenuLi>
                <Smiling />
                소통
              </MenuLi>
            </a>
          </Link>
          <Link href="/article/news">
            <a>
              <MenuLi>
                <Party />
                뉴스
              </MenuLi>
            </a>
          </Link>

          {acccountUserName ? (
            <>
              <UserNameDiv>{acccountUserName.slice(0, 2)}</UserNameDiv>
              <ProfileDiv>
                님<Heart />
              </ProfileDiv>
            </>
          ) : (
            <>
              <Link href="/accounts/login">
                <a>
                  <LoginSignUp>
                    <Blow />
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
