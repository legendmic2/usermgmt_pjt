import RootApi from "./RootApi";
import RootStore from "../stores/RootStore";
import IUser from "../types/User";
import { AxiosError, AxiosResponse } from "axios";
import ILoginData from "../types/LoginData";
import ILoginResult from "../types/LoginResult";
import IResponseError, { IMessage } from "../types/ResponseError";
import { setCookie } from "../utils/Cookie";
import { CookieSetOptions } from "universal-cookie";

export default class UserApi {
  constructor(private api: RootApi, private store: RootStore) {}

  async login(loginUser: ILoginData) {
    await this.api.client
      .post<ILoginResult | IResponseError>(`/api/login`, loginUser)
      .then((res) => {
        if ("accessToken" in res.data) {
          setCookie("accessToken", res.data.accessToken);
        }
      })
      .catch((error) => {
        throw new Error(error.response.data.error.message);
      });
  }

  async loginUserGet() {
    const res = await this.api.client.get(`/api/user`);

    this.store.user.loadLoginUserData(res.data);
  }
}
