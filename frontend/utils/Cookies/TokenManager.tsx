import axios from "axios";
import Cookies from "universal-cookie";
import { HTTP_ONLY } from "./config/config";

const cookies = new Cookies();
const expires = new Date();

function setAccessToken(accessToken: string) {
  axios.defaults.headers.common.Authorization = `JWT ${accessToken}`;
  expires.setDate(Date.now() + 1000 * 60 * 15);
  cookies.set("accessToken", accessToken, {
    path: "/",
    expires,
    httpOnly: HTTP_ONLY,
  });
}
function setRefreshToken(refreshToken: string) {
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24);
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
function setVerrifyToken() {
  if (cookies.get("accessToken")) {
    axios
      .post(process.env.NEXT_PUBLIC_ENV_BASE_URL + "jwt/verify/", {
        token: cookies.get("accessToken"),
      })
      .catch((e) => {
        if (e) {
          axios
            .post(process.env.NEXT_PUBLIC_ENV_BASE_URL + "jwt/refresh/", {
              refresh: cookies.get("refreshToken"),
            })
            .then((res) => {
              if (res) {
                console.log("토큰을 재발급 합니다");
                expires.setDate(Date.now() + 1000 * 60 * 15);
                cookies.set("accessToken", res.data.access, {
                  path: "/",
                  expires,
                  httpOnly: HTTP_ONLY,
                });
              }
            });
        }
      });
  }
}

export { setAccessToken, setRefreshToken, setLogoutToken, setVerrifyToken };
