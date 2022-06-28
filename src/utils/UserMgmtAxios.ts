import axios, { AxiosRequestHeaders } from "axios";
import { config } from "process";
import { loginURL } from "./Constants";
import { getCookie } from "./Cookie";

const client = axios.create({
  //   baseURL: "https://ably-frontend-assignment-server.vercel.app",
  baseURL: "/",
});

const defaultHeader = {
  "Content-Type": "application/json",
} as AxiosRequestHeaders;

// const authHeader = {
//     "Authorization": `Bearer ${}`
// }

// axios.defaults.headers.common["Content-Type"] = "application/json";

client.interceptors.request.use((config) => {
  const requestHeader =
    config.url === loginURL
      ? defaultHeader
      : ({
          ...defaultHeader,
          Authorization: `Bearer ${getCookie("accessToken")}`,
        } as AxiosRequestHeaders);

  if (!requestHeader.defaultHeader) {
    alert("Access Token이 존재하지 않습니다. Login 화면으로 이동합니다.");
  }

  return { ...config, headers: { ...requestHeader } };

  //   client.interceptors.response.use((response) => {

  //   },
  //   (error) => {

  //   });
});
