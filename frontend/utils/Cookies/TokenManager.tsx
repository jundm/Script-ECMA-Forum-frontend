import axios from "axios";
import cookie from "react-cookies";
import { HTTP_ONLY } from "./config/config";

function setLoginToken(accessToken: string, refreshToken: string) {
  axios.defaults.headers.common["Authorization"] = "JWT" + accessToken;
  const expires = new Date();
  expires.setDate(Date.now() + 1000 * 60 * 15);
  cookie.save("accessToken", accessToken, {
    path: "/",
    expires,
    httpOnly: HTTP_ONLY,
  });
  cookie.save("refreshToken", refreshToken, {
    path: "/",
    expires,
    httpOnly: HTTP_ONLY,
  });
}

export { setLoginToken };
