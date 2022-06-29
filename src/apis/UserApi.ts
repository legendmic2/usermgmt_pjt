import RootApi from "./RootApi";
import RootStore from "../stores/RootStore";
import IUser from "../types/User";
import { AxiosError, AxiosResponse } from "axios";
import ILoginData from "../types/LoginData";
import ILoginResult from "../types/LoginResult";
import IResponseError, { IMessage } from "../types/ResponseError";
import { setCookie } from "../utils/Cookie";
import { CookieSetOptions } from "universal-cookie";
import ILogoutData from "../types/LogoutData";
import IVerifyIssuaranceData from "../types/VerifyIssuaranceData";
import IVerifyCodeData from "../types/VerifyCodeData";
import IVerifyCodeResultData from "../types/VerifyCodeResultData";
import IChangePasswordData from "../types/ChangePasswordData";
import IChangePasswordResultData from "../types/ChangePasswordResultData";

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

  async logout() {
    await this.api.client
      .post<ILogoutData | IResponseError>(`/api/logout`)
      .catch((error) => {
        throw new Error(error.response.data.error.message);
      });
  }

  async issueTokenGet(email: string) {
    await this.api.client
      .get<IVerifyIssuaranceData | IResponseError>(
        `/api/reset-password?email=${email}`
      )
      .then((res) => {
        if ("issueToken" in res.data && "remainMillisecond" in res.data) {
          this.store.user.setIssueToken(res.data.issueToken);
          this.store.user.setRemainMillisecond(res.data.remainMillisecond);
        }
      })
      .catch((error) => {
        throw new Error(error.response.data.error.message);
      });
  }

  async codeVerify(code: string) {
    await this.api.client
      .post<IVerifyCodeResultData | IResponseError>(`/api/reset-password`, {
        email: this.store.user.passwordResetEmail,
        authCode: code,
        issueToken: this.store.user.issueToken,
      } as IVerifyCodeData)
      .then((res) => {
        if ("confirmToken" in res.data) {
          this.store.user.setConfirmToken(res.data.confirmToken);
        }
      })
      .catch((error) => {
        throw new Error(error.response.data.error.message);
      });
  }

  async changePassword() {
    await this.api.client
      .patch<IChangePasswordResultData | IResponseError>(
        `/api/reset-password`,
        {
          email: this.store.user.passwordResetEmail,
          confirmToken: this.store.user.confirmToken,
          newPassword: this.store.user.newPassword,
          newPasswordconfirm: this.store.user.confirmPassword,
        } as IChangePasswordData
      )
      .catch((error) => {
        throw new Error(error.response.data.error.message);
      });
  }
}
