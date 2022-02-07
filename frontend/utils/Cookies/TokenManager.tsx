import axios from "axios";
import Cookies from "universal-cookie";
import { HTTP_ONLY } from "./config/config";

const cookies = new Cookies();

function setAccessToken(accessToken: string) {
  const expires = new Date(Date.now() + 1000 * 60 * 14);
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
    // expires,
    httpOnly: HTTP_ONLY,
  });
}
function setLogoutToken() {
  axios.defaults.headers.common.Authorization = "";
  cookies.remove("accessToken", { path: "/" });
  cookies.remove("refreshToken", { path: "/" });
}
function setVerrifyToken() {
  if (!cookies.get("accessToken")) {
    axios
      .post(process.env.NEXT_PUBLIC_ENV_BASE_URL + "jwt/refresh/", {
        refresh: cookies.get("refreshToken"),
      })
      .then((res) => {
        if (res) {
          console.log("토큰이 삭제가 잘되서 토큰을 재발급 합니다");
          setAccessToken(res.data.access);
        }
      });
  } else if (cookies.get("accessToken")) {
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
                console.log(
                  "만료시간이 지났지만 토큰삭제가 안되서 재발급 합니다"
                );
                setAccessToken(res.data.access);
              }
            });
        }
      });
  }
}

export { setAccessToken, setRefreshToken, setLogoutToken, setVerrifyToken };
