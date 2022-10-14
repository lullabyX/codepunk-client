import {useDispatch} from "react-redux";
import {Cell, cellActions} from "../../store";
import classes from "./MoveCell.module.css";

interface MoveCellProps {
  id: Cell["id"];
  isCodeCell: boolean
}

const MoveCell: React.FC<MoveCellProps> = ({ id, isCodeCell }) => {
  const dispatch = useDispatch();
  return (
    <div className={`${classes.container} ${isCodeCell ? classes.code : ''}`}>
      <button
        onClick={(_) => dispatch(cellActions.move({ direction: "up", id: id }))}
      >
        <span>
          <i className={classes["gg-chevron-up"]}></i>
        </span>
      </button>
      <button
        onClick={(_) =>
          dispatch(cellActions.move({ direction: "down", id: id }))
        }
      >
        <span>
          <i className={classes["gg-chevron-down"]}></i>
        </span>
      </button>
      <button onClick={(_) => dispatch(cellActions.delete({ id: id }))}>
        <span>
          <i className={classes["gg-close"]}></i>
        </span>
      </button>
    </div>
  );
};

export default MoveCell;
