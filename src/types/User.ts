export default interface IUser {
  name: string;
  email: string;
  profileImage: string;
  lastConnectedAt: Date;
}

export interface IUserForDisplay {
  name: string;
  email: string;
  profileImage: string;
  lastConnectedAt: string;
}

export const emptyIUser = {
  name: "",
  email: "",
  profileImage: "",
  lastConnectedAt: new Date(),
} as IUser;
