export default interface IUser {
  userUID: string;
  userName: string | null | undefined;
  userEmail: string | null | undefined;
  goal?: string;
}
