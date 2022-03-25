import { setVerifyToken } from "@utils/Cookies/TokenManager";
import axios from "axios";
import useSWR from "swr";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const fetcher = function (url: string) {
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (e) => {
      if (e.message === "Request failed with status code 401") {
        axios.defaults.headers.common.Authorization = "";
      } else {
        return e;
      }
    }
  );

  return axios
    .get(process.env.NEXT_PUBLIC_ENV_BASE_URL + url)
    .then((res) => res.data);
};

export default function useFetch(url: string) {
  return useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (retryCount >= 10) return;
      if (
        key.split("/")[3] === "comments" ||
        key.split("/")[3] === "commentsReply"
      )
        return;
      if (!axios.defaults.headers.common.Authorization) {
        setVerifyToken();
        console.log("error 재발급");
      }
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });
}
