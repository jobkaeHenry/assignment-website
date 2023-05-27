import { atom } from "recoil";

export const modalComponentAtom = atom<React.ReactNode>({
  key: "modalComponent",
  default: null,
});

export const isModalOpenAtom = atom({
  key: "isModalOpen",
  default: false,
});
