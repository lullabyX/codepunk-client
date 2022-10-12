import { Fragment } from "react";
import useTypedSelector from "../hooks/use-typed-selector";
import AddCell from "./AddCell";
import CellItem from "./CellItem";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cell: { order, data } }) =>
    order.map((id) => data[id])
  );

  const cellItems = cells.map((cell) => {
    return (
      <Fragment key={cell.id}>
        <CellItem cell={cell} />
        <AddCell id={cell.id} />
      </Fragment>
    );
  });

  return (
    <div>
      <AddCell id={null} />
      {cellItems}
    </div>
  );
};

export default CellList;
