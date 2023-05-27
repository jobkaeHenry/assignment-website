import useSetTitle from "../../hooks/useSetTitle";
import MobileWrapper from "../../layouts/MobileWrapper";

const Main = () => {
  useSetTitle("Assignment");
  return (
    <>
      <MobileWrapper></MobileWrapper>
    </>
  );
};

export default Main;
