import RootStore from "../stores/RootStore";
import IUser from "../types/User";
import { computed, makeObservable } from "mobx";

export default class User implements IUser {
  name: string;
  email: string;
  profileImage: string;
  lastConnectedAt: Date;

  constructor(private store: RootStore, user: IUser) {
    this.name = user.name;
    this.email = user.email;
    this.profileImage = user.profileImage;
    this.lastConnectedAt = user.lastConnectedAt;

    makeObservable(this);
  }

  //   @computed get storeContents() {
  //     return this.store.product.all.filter((it) => it.vendorId === this.id);
  //   }

  //   @computed get reviews() {
  //     return this.store.review.all.filter((it) => it.userId === this.id);
  //   }
}
