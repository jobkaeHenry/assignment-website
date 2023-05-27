import axios from "axios";
import { getLS } from "../../utils/localStorage";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL_DEV = import.meta.env.VITE_BASE_URL_DEV;

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "x-CSRFToken";

if (import.meta.env.NODE_ENV === "development") {
  axios.defaults.baseURL = BASE_URL_DEV;
} else {
  axios.defaults.baseURL = BASE_URL;
}

/**쿠키를 싣고가야하는 요청 axios */
export const axiosPrivate = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getLS("accessToken")}`,
  },
  withCredentials: true,
});

export default axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
