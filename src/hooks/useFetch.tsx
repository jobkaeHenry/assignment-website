import { AxiosRequestConfig } from "axios";
import axios from "../lib/api/axios";

const useFetch = async <T extends object>(
  url: string,
  config?: AxiosRequestConfig
) => {
  const { data } = await axios.get<T>(url, config);
  return data;
};

export default useFetch;
