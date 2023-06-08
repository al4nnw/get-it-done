export default interface IUser {
  userUid: string;
  userName: string | null | undefined;
  userEmail: string | null | undefined;
  goal?: string;
}
