import axios from "axios";
import useSWR from "swr";

export const fetcher = function (url: string) {
  return axios.get(url).then((res) => res.data);
};

export default function useFetch(url: string) {
  return useSWR(url, fetcher);
}
