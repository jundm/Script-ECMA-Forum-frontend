import axios from "axios";
import Cookies from "universal-cookie";
import { HTTP_ONLY } from "./config/config";

const cookies = new Cookies();

function setLoginToken(accessToken: string, refreshToken: string) {
  const expires = new Date();
  axios.defaults.headers.common.Authorization = `JWT ${accessToken}`;
  // console.log("Authorization이 설정되었습니다");
  expires.setDate(Date.now() + 1000 * 60 * 15);
  cookies.set("accessToken", accessToken, {
    path: "/",
    expires,
    httpOnly: HTTP_ONLY,
  });
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24);
  cookies.set("refreshToken", refreshToken, {
    path: "/",
    expires,
    httpOnly: HTTP_ONLY,
  });
}
function setLogoutToken() {
  axios.defaults.headers.common["Authorization"] = "";
  console.log("Authorization이 로그아웃 되었습니다");
  cookies.remove("accessToken", { path: "/" });
  cookies.remove("refreshToken", { path: "/" });
}
function setRefreshToken() {
  const refreshToken = cookies.get("refreshToken");
  if (refreshToken) {
  }
}

export { setLoginToken, setLogoutToken };
