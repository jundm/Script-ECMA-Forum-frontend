import styled from "@emotion/styled";

export const HeaderOutLineBig = styled.header`
  text-align: center;
  z-index: 200;
  background: #3f81b3 url("https://source.unsplash.com/DSwBHyWKiVw/1280x720")
    no-repeat center;
  background-size: cover;
  //position: fixed;
  width: 100%;
`;

export const Logo = styled.img`
  width: 350px;
`;

export const WidthDiv = styled.div`
  display: flex;
  justify-content: center;
`;
export const AuthenticationDiv = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  z-index: 20;
`;
export const LoginSignUp = styled.div`
  z-index: 21;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  color: #d1e834;
  /* -webkit-text-stroke: 0.5px #000000; */
  text-shadow: -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000,
    0.5px 0.5px 0 #000;
  cursor: pointer;
  :hover {
    background-color: #3a3a8ac7;
  }
`;
export const HeaderLoginDiv = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 5px;
  margin-top: 5px;
`;
export const ProfileDiv = styled(HeaderLoginDiv)`
  color: #ffffff;
  text-shadow: -0.6px -0.6px 0 #000, 0.6px -0.6px 0 #000, -0.6px 0.6px 0 #000,
    0.6px 0.6px 0 #000;
`;
export const UserNameDiv = styled(HeaderLoginDiv)`
  color: #d5e433;
  cursor: pointer;
  margin-right: 0px;
  text-shadow: -0.2px -0.2px 0 #000, 0.2px -0.2px 0 #000, -0.2px 0.2px 0 #000,
    0.2px 0.2px 0 #000;
  :hover {
    background-color: #3a3a8ac7;
  }
`;
export const Logout = styled(HeaderLoginDiv)`
  color: #00000065;
  cursor: pointer;
  :hover {
    color: #00000021;
  }
`;

export const Div = styled.div`
  height: 150px;
  display: inline-block;
  vertical-align: middle;
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  animation: float 3s ease-in-out infinite;
`;
export const FaceDiv = styled.div`
  margin: auto;
  margin-bottom: -40px;
  transform: translate(-73px, -126px);
  /* border: 1px solid black; */
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

export const FaceMessageDiv = styled(FaceDiv)`
  //display: hidden;
  transform: translate(70px, -110px);
  text-shadow: -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000,
    0.5px 0.5px 0 #000;
  color: white;
  font-weight: bold;
  width: 230px;
`;

export const MenuUl = styled.ul`
  /* background: grey; */
  display: flex;
  justify-content: center;
  text-align: center;
  z-index: 21;
`;
export const MenuLi = styled.li`
  //display: relative;
  z-index: 21;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 1.2em;
  color: #d1e834;
  /* -webkit-text-stroke: 0.5px #000000; */
  text-shadow: -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000,
    0.5px 0.5px 0 #000;
  cursor: pointer;
  :hover {
    background-color: #3a3a8ac7;
  }
`;
