import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import "../../cyberpunk.css";
import { Cell, cellActions } from "../../store";
import classes from "./AddCell.module.css";

interface AddCellProps {
  id: Cell["id"] | null;
}

const AddCell: React.FC<AddCellProps> = ({ id }) => {
  const dispatch = useDispatch();
  const textCellAddHandler = (_: MouseEvent) => {
    dispatch(
      cellActions.insertBefore({
        id: id,
        type: "text",
      })
    );
  };

  const codeCellAddHandler = (_: MouseEvent) => {
    dispatch(
      cellActions.insertBefore({
        id: id,
        type: "javascript",
      })
    );
  };

  return (
    <div className={classes.container}>
      <div className={`${classes["container-button"]}`}>
        <button
          onClick={textCellAddHandler}
          className={`cyberpunk2077 blue button`}
        >
          Text_
        </button>
        <button
          onClick={codeCellAddHandler}
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
