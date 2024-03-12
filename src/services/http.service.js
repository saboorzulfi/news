// ** Third party imports
import axios from "axios";

// ** utils
import { log } from "utils/logger.util";

// ** Config
import  {API_NEWSAPI_URL}   from "config/config";

// ** Base url
axios.defaults.baseURL = API_NEWSAPI_URL;
const CancelToken = axios.CancelToken;

let source = CancelToken.source();

axios.interceptors.request.use(
  (config) => {
    const { url, data, method } = config;

    log(`http ${method} request`, url, "\n", data);

    return { ...config, cancelToken: source.token };
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (res) => {
    const { config } = res;
    const { url, method } = config;
    const { data, message } = res.data;

    log(`http ${method} response`, url, "\n", data);

    return res;
  },
  (err) => {
    const { config, message: msg, response } = err;
    const message = response?.data?.message;
    const { url, method } = config;

    log(`http ${method} error`, url, message || msg);

    if (!response) throw err;

    const { code } = response.data;

    if (
      code === 401 &&
      (message === "Unauthorized" ||
        message === "Password has been changed, Login again" ||
        message === "Login session has been expired, Login again")
    ) {
      source.cancel(message);

      setTimeout(() => {
        source = CancelToken.source();

        // if (window.location.pathname !== "/") window.location.assign("/");
      }, 300);
    }

    throw err;
  }
);

const http = {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  patch: axios.patch,
  delete: axios.delete,
  setJWT: () => {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token") || "";
  },
  setMultiPart: () => {
    axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
  },
};

export default http;
