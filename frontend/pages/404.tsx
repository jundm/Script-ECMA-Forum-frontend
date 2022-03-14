import React from "react";

import styled from "@emotion/styled";

export const TextDiv = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  font-size: 3vmax;
  color: #000000;
`;
export const TitleDiv = styled.div`
  letter-spacing: 1vmax;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -50px;
`;
export const TextH1 = styled.h1`
  font-size: 15vmax;
  color: #000000;
`;
export const TextH2 = styled.h2`
  text-align: center;
  font-size: 5vmax;
  color: #000000;
`;
export const InvisibleH1 = styled.h1`
  font-size: 15vmax;
  color: #ffffff10;
`;

const rand = Math.random();
export const BearImg = styled.img`
  top: 290px;
  width: 15vmax;
  object-fit: contain;
  position: absolute;
  transform: translate(-5px, 5px);
  @keyframes headRotate {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(20deg);
    }
    50% {
      transform: rotate(-20deg);
    }
    75% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  animation: headRotate 3s ease-in-out infinite;
`;
interface NotFoundProps {}

const NotFound: NotFoundProps = () => {
  return (
    <>
      <TitleDiv>
        <TextH1>4</TextH1>
        <InvisibleH1>0</InvisibleH1>
        <TextH1>4</TextH1>
        <BearImg
          src="https://user-images.githubusercontent.com/80582578/144751264-7a5a7442-9c44-4b9c-9eb0-6f30caa3ff85.png"
          alt="404"
        />
      </TitleDiv>
      <TextH2>Not Found</TextH2>
      <TextDiv>앗! 죄송합니다!</TextDiv>
      <TextDiv>페이지를 준비하지 못했습니다</TextDiv>
    </>
  );
};
export default NotFound;
