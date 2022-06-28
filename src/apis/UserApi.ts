import RootApi from "./RootApi";
import RootStore from "../stores/RootStore";
import IUser from "../types/User";
import { AxiosError, AxiosResponse } from "axios";
import ILoginData from "../types/LoginData";
import ILoginResult from "../types/LoginResult";
import { IMessage } from "../types/ResponseError";
import { setCookie } from "../utils/Cookie";
import { CookieSetOptions } from "universal-cookie";

export default class UserApi {
  constructor(private api: RootApi, private store: RootStore) {}

  async login(loginUser: ILoginData) {
    const res = await this.api.client.post<
      ILoginResult | AxiosError<IMessage, any>
    >(`/auth/signin`, loginUser);

    if ("accessToken" in res.data) {
      setCookie("accessToken", res.data.accessToken, {
        httpOnly: true,
      } as CookieSetOptions);

      return true;
    } else return false;
  }
}
