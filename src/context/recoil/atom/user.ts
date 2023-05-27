import { atom } from "recoil";

export const LoginStatus = atom<boolean>({
  key: "userState",
  default: false,
});

export const userInfoAtom = atom<{
  userId: undefined | string;
  isSeller: boolean | undefined;
}>({
  key: "userInfo",
  default: { userId: undefined, isSeller: undefined },
});
