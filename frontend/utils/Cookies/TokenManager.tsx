import axios from "axios";
import Cookies from "universal-cookie";
import { HTTP_ONLY } from "./config/config";

const cookies = new Cookies();
const accessToken = cookies.get("accessToken");
const refreshToken = cookies.get("refreshToken");

function parseJwt(token: string) {
  if (!token) return;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function setAccessToken(accessToken: string) {
  const expires = new Date(Date.now() + 1000 * 60 * 30);
  axios.defaults.headers.common.Authorization = `JWT ${accessToken}`;
  cookies.set("accessToken", accessToken, {
    path: "/",
    expires,
    httpOnly: HTTP_ONLY,
  });
}
function setRefreshToken(refreshToken: string) {
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);
  cookies.set("refreshToken", refreshToken, {
    path: "/",
    expires,
    httpOnly: HTTP_ONLY,
  });
}
function setLogoutToken() {
  axios.defaults.headers.common.Authorization = "";
  cookies.remove("accessToken", { path: "/" });
  cookies.remove("refreshToken", { path: "/" });
}

function setVerifyToken(expireAccessTokenTime?: number) {
  const currentTime = Date.now();
  const NewAccessToken = axios
    .post(process.env.NEXT_PUBLIC_ENV_BASE_URL + "jwt/refresh/", {
      refresh: cookies.get("refreshToken"),
    })
    .then((res) => {
      if (res) {
        setAccessToken(res.data.access);
      }
    });
  if (
    !axios.defaults.headers.common.Authorization &&
    !accessToken &&
    !refreshToken
  ) {
    return alert("로그인이 필요합니다");
  }
  if (!axios.defaults.headers.common.Authorization || !accessToken) {
    NewAccessToken;
    console.log(
      `${
        !axios.defaults.headers.common.Authorization ? "헤더삭제" : "토큰삭제"
      }-재발급`
    );
  }
  if (!expireAccessTokenTime) return;
  // 사용중에 마감시간에 임박하면 재발급
  if (currentTime + 1000 * 60 * 5 >= expireAccessTokenTime) {
    NewAccessToken;
    console.log("마감임박-재발급");
  }
}

export {
  setAccessToken,
  setRefreshToken,
  setLogoutToken,
  setVerifyToken,
  parseJwt,
};
