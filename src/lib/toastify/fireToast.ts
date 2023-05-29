import { TypeOptions, toast } from "react-toastify";
const fireToast = (message: string, type: TypeOptions = "info") => {
  toast(message, {
    position: "bottom-right",
    type: type,
    progress: 0,
    autoClose: 3000,
    hideProgressBar: true,
  });
};

export default fireToast;
