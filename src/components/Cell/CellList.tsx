import { Fragment, useEffect } from "react";
import { fetchCells, postCells } from "../../store/action-creators/cells";
import useTypedDispatch from "../hooks/use-typed-dispatch";
import useTypedSelector from "../hooks/use-typed-selector";
import AddCell from "./AddCell";
import CellItem from "./CellItem";
import classes from "./CellList.module.css";

const CellList: React.FC = () => {
  const dispatch = useTypedDispatch();
  const cells = useTypedSelector(({ cell: { order, data } }) =>
    order.map((id) => data[id])
  );

  useEffect(() => {
    dispatch(fetchCells());
  }, [dispatch]);

  useEffect(() => {
    dispatch(postCells(cells));
  }, [cells, dispatch]);

  const cellItems = cells.map((cell) => {
    return (
      <Fragment key={cell.id}>
        <CellItem cell={cell} />
        <AddCell id={cell.id} />
      </Fragment>
    );
  });

  return (
    <div className={classes["cell-list"]}>
      <AddCell isAlone={cellItems.length === 0} id={null} />
      {cellItems}
    </div>
  );
};

export default CellList;
