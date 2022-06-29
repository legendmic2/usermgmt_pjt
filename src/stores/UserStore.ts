import {
  action,
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
} from "mobx";
import User from "../models/User";
import RootStore from "./RootStore";
import IUser, { emptyIUser, IUserForDisplay } from "../types/User";
import { deleteCookie } from "../utils/Cookie";

export default class UserStore {
  byId = observable.map<string, User>();

  loginUserInfo: IUser = emptyIUser;

  passwordResetEmail: string = "";

  issueToken: string = "";

  remainMillisecond: number = -1;

  constructor(private store: RootStore) {
    makeObservable(this);
  }

  @action loadLoginUserData(loginUser: IUser) {
    this.loginUserInfo = { ...loginUser } as IUser;
  }

  @computed get loginUserForDisplay() {
    return {
      name: this.loginUserInfo.name,
      email: this.loginUserInfo.email,
      profileImage: this.loginUserInfo.profileImage,
      lastConnectedAt: this.loginUserInfo.lastConnectedAt.toDateString(),
    } as IUserForDisplay;
  }

  @action logoutProcess() {
    this.loginUserInfo = emptyIUser;
    deleteCookie("accessToken");
  }

  @action setPasswordResetEmail(input: string) {
    this.passwordResetEmail = input;
  }

  @action setIssueToken(input: string) {
    this.issueToken = input;
  }

  @action setRemainMillisecond(input: number) {
    this.remainMillisecond = input;
  }
}
