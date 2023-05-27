import { atom } from "recoil";

export const LoginStatus = atom<boolean>({
  key: "userState",
  default: false,
});
