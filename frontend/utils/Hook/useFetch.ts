import axios from "axios";
import useSWR from "swr";

export const fetcher = function (url: string) {
  return axios
    .get(process.env.NEXT_PUBLIC_ENV_BASE_URL + url)
    .then((res) => res.data);
};

export default function useFetch(url: string) {
  return useSWR(url, fetcher);
}
