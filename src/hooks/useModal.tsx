import { useRecoilState } from "recoil";
import {
  isModalOpenAtom,
  modalComponentAtom,
} from "../context/recoil/atom/globalModalAtom";

/** 모달 컴포넌트를 인자로 받아 모달을 생성해주는 함수를 리턴하는 훅 */
const useModal = () => {
  const [ModalComponent, setModalComponent] =
    useRecoilState(modalComponentAtom);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenAtom);

  /** 모달로 사용할 컴포넌트를 인자로 받아 모달을 생성 */
  const onClickModal = (component: React.ReactNode) => {
    if (ModalComponent !== component) {
      setModalComponent(component);
    }
    setIsModalOpen((prev) => !prev);
  };
  return onClickModal;
};

export default useModal;
