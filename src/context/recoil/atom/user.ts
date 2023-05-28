import { atom } from "recoil";

export const LoginStatus = atom<boolean>({
  key: "userState",
  default: false,
});

export const userInfoAtom = atom<{
  userId: string | undefined;
  isSeller: boolean | undefined;
  userName: string | undefined;
  isSellerNow: boolean | undefined;
}>({
  key: "userInfo",
  default: {
    isSellerNow: false,
    userId: undefined,
    isSeller: undefined,
    userName: undefined,
  },
});
