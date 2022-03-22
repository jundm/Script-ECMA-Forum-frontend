import styled from "@emotion/styled";

export const HeaderOutLineSmall = styled.header`
  z-index: 200;
  background: #3f81b3 url("https://source.unsplash.com/DSwBHyWKiVw/1280x720")
    no-repeat center;
  background-size: cover;
  //position: fixed;
  width: 100%;
  margin-bottom: 10px;
`;

export const WidthDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  //width: 400px;
`;
export const Logo = styled.img`
  width: 50px;
  height: 50px;
`;
export const AuthenticationDiv = styled.div`
  display: flex;
  justify-content: right;
  text-align: center;
  z-index: 20;
`;
export const LoginSignUp = styled.div`
  z-index: 21;
  padding: 10px 0px;
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
export const ProfileDiv = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 1.1rem;
  color: #ffffff;
  text-shadow: -0.6px -0.6px 0 #000, 0.6px -0.6px 0 #000, -0.6px 0.6px 0 #000,
    0.6px 0.6px 0 #000;
`;
export const UserNameDiv = styled.div`
  display: flex;
  /* align-items: center; */
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  color: #d5e433;
  margin-right: 0px;
  text-shadow: -0.2px -0.2px 0 #000, 0.2px -0.2px 0 #000, -0.2px 0.2px 0 #000,
    0.2px 0.2px 0 #000;
  :hover {
    background-color: #3a3a8ac7;
  }
`;

export const MenuUl = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const MenuLi = styled.li`
  z-index: 21;
  display: flex;
  padding: 10px 1px;
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
