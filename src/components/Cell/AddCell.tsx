import { useDispatch } from "react-redux";
import "../../cyberpunk.css";
import { Cell, cellActions } from "../../store";
import classes from "./AddCell.module.css";

interface AddCellProps {
  id: Cell["id"] | null;
}

const AddCell: React.FC<AddCellProps> = ({ id }) => {
  const dispatch = useDispatch();
  const cellAddHandler = (cellType: Cell["type"]): void => {
    dispatch(
      cellActions.insertAfter({
        id: id,
        type: cellType,
      })
    );
  };

  return (
    <div className={classes.container}>
      <div className={`${classes["container-button"]}`}>
        <button
          onClick={cellAddHandler.bind(null, "text")}
          className={`cyberpunk2077 blue button`}
        >
          Text_
        </button>
        <button
          onClick={cellAddHandler.bind(null, "javascript")}
          className={`cyberpunk2077 purple button ${classes["alt"]}`}
        >
          Code_
        </button>
      </div>
      <div className={classes["horizontal-divider"]} />
    </div>
  );
};

export default AddCell;
