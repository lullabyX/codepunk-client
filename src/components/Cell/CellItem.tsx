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
      <div style={{ top: "0px", position: "relative" }}>
        <MdEditor id={cell.id} />
      </div>
    );
  } else {
    child = (
      <div style={{ top: "0px", position: "relative" }}>
        <MoveCell isCodeCell={true} id={cell.id} />
        <CodeCell id={cell.id} />
      </div>
    );
  }
  return <div>{child}</div>;
};

export default CellItem;
