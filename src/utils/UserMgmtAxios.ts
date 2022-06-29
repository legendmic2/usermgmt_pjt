import axios, { AxiosRequestHeaders } from "axios";
import { config } from "process";
import { loginURL } from "./Constants";
import { getCookie } from "./Cookie";

export const axiosClient = axios.create({
  baseURL: "https://ably-frontend-assignment-server.vercel.app",
});

const defaultHeader = {
  "Content-Type": "application/json",
} as AxiosRequestHeaders;

axiosClient.interceptors.request.use((config) => {
  const requestHeader = { ...defaultHeader };
  const accessToken = getCookie("accessToken");

  if (config.url === loginURL) {
    return { ...config, headers: { ...defaultHeader } };
  } else {
    return {
      ...config,
      headers: {
        ...defaultHeader,
        Authorization: `Bearer ${accessToken}`,
      },
    };
    // const accessToken = getCookie("accessToken");
    // if(!accessToken) {
    //     alert("Access Token이 존재하지 않습니다. Login 화면으로 이동합니다.");
    // }
  }
  //     config.url === loginURL
  //       ? defaultHeader
  //       : ({
  //           ...defaultHeader,
  //           Authorization: `Bearer ${getCookie("accessToken")}`,
  //         } as AxiosRequestHeaders);

  //   if (!requestHeader["Authorization"]) {
  //     alert("Access Token이 존재하지 않습니다. Login 화면으로 이동합니다.");
  //   }

  //   return { ...config, headers: { ...requestHeader } };

  //   client.interceptors.response.use((response) => {

  //   },
  //   (error) => {

  //   });
});
