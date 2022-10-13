import { bundleActions, bundleProcessInit, Cell } from "../../store";
import useTypedDispatch from "../hooks/use-typed-dispatch";
import useTypedSelector from "../hooks/use-typed-selector";
import Resizable from "../Resizable/Resizable";
import classes from "./CodeCell.module.css";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";

interface CodeCellProps {
  id: Cell["id"];
}

const CodeCell: React.FC<CodeCellProps> = ({ id }) => {
  const bundle = useTypedSelector((state) => state.bundle[id]);

  const message = {
    code: bundle ? bundle.code : "",
    error: bundle?.error,
  };

  const dispatch = useTypedDispatch();

  const rawCodeBundler = (rawCode: string) => {
    dispatch(bundleProcessInit(id, rawCode));
  };

  const prettierErrorHandler = (error: string) => {
    dispatch(bundleActions.end({ id, code: null, error: error }));
  };

  const previewWindow = bundle?.loading ? (
    <div className={classes['preview-loading']}>
      <div className={classes["classic-5"]} />
    </div>
  ) : (
    <Preview message={message} />
  );

  return (
    <div style={{ marginBottom: "25px" }}>
      <Resizable direction="vertical">
        <div
          className={`${classes["cyberpunk-container"]} ${classes.codecell} `}
        >
          <Resizable direction="horizontal">
            <CodeEditor
              id={id}
              onBundle={rawCodeBundler}
              onPrettierError={prettierErrorHandler}
            />
          </Resizable>
          <div className={classes["preview-container"]}>{previewWindow}</div>
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
