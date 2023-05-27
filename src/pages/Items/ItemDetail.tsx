import { useParams } from "react-router-dom";

type Props = {};

const ItemDetail = (props: Props) => {
  const { id } = useParams();
  alert(id);
  return <div>ItemDetail</div>;
};

export default ItemDetail;
