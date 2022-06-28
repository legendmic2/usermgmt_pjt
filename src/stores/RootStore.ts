import UserStore from "./UserStore";

export default class RootStore {
  user = new UserStore(this);
}
