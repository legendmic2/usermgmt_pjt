export default interface IChangePasswordData {
  email: string;
  confirmToken: string;
  newPassword: string;
  newPasswordconfirm: string;
}
