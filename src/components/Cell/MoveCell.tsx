import { useDispatch } from "react-redux";
import { Cell, cellActions } from "../../store";
import classes from "./MoveCell.module.css";

interface MoveCellProps {
  id: Cell["id"];
}

const MoveCell: React.FC<MoveCellProps> = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <div className={classes.container}>
      <button
        onClick={(_) => dispatch(cellActions.move({ direction: "up", id: id }))}
      >
        up
      </button>
      <button
        onClick={(_) =>
          dispatch(cellActions.move({ direction: "down", id: id }))
        }
      >
        down
      </button>
      <button
        onClick={(_) => dispatch(cellActions.delete({ id: id }))}
      >
        close
      </button>
    </div>
  );
};

export default MoveCell;
