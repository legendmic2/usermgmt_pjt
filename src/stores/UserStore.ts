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

export default class UserStore {
  byId = observable.map<string, User>();

  loginUserInfo: IUser = emptyIUser;

  constructor(private store: RootStore) {
    makeObservable(this);
  }

  @action loadLoginUserData(loginUser: IUser) {
    this.loginUserInfo = { ...loginUser } as IUser;
    //new User(this.store, loginUser);
  }

  @computed get loginUserForDisplay() {
    return {
      name: this.loginUserInfo.name,
      email: this.loginUserInfo.email,
      profileImage: this.loginUserInfo.profileImage,
      lastConnectedAt: this.loginUserInfo.lastConnectedAt.toDateString(),
    } as IUserForDisplay;
  }
}
