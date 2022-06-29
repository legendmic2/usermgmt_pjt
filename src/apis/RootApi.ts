import axios, { AxiosInstance } from "axios";
import RootStore from "../stores/RootStore";
import { axiosClient } from "../utils/UserMgmtAxios";
import UserApi from "./UserApi";

export default class RootApi {
  client = axiosClient;
  // axios.create({
  //   baseURL: "https://ably-frontend-assignment-server.vercel.app",
  // });

  user: UserApi;

  // todo: user, review 추가

  // todo: AxiosUtil 생성

  constructor(store: RootStore) {
    this.user = new UserApi(this, store);
  }
}
