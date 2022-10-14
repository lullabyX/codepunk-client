import { Fragment } from "react";
import { Cell } from "../../store";
import CodeCell from "../CodeCell/CodeCell";
import MdEditor from "../MdEditor/MdEditor";
import MoveCell from "./MoveCell";

interface CellItemProps {
  cell: Cell;
}

const CellItem: React.FC<CellItemProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === "text") {
    child = (
      <Fragment>
        <MdEditor id={cell.id} />
      </Fragment>
    );
  } else {
    child = (
      <Fragment>
        <MoveCell isCodeCell={true} id={cell.id} />
        <CodeCell id={cell.id} />
      </Fragment>
    );
  }
  return <div>{child}</div>;
};

export default CellItem;
