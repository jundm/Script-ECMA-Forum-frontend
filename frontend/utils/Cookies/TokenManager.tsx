import axios from "axios";
import Cookies from "universal-cookie";
import { HTTP_ONLY } from "./config/config";

const cookies = new Cookies();

function setAccessToken(accessToken: string) {
  axios.defaults.headers.common.Authorization = `JWT ${accessToken}`;
  const expires = new Date();
  expires.setDate(Date.now() + 1000 * 60 * 15);
  cookies.set("accessToken", accessToken, {
    path: "/",
    expires,
    httpOnly: HTTP_ONLY,
  });
}
function setRefreshToken(refreshToken: string) {
  const expires = new Date();
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24);
  cookies.set("refreshToken", refreshToken, {
    path: "/",
    expires,
    httpOnly: HTTP_ONLY,
  });
}
function setLogoutToken() {
  axios.defaults.headers.common["Authorization"] = "";
  cookies.remove("accessToken", { path: "/" });
  cookies.remove("refreshToken", { path: "/" });
}

export { setAccessToken, setRefreshToken, setLogoutToken };
