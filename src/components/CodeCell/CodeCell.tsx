import {useCallback, useState} from "react";
import { bundleActions, bundleProcessInit, Cell } from "../../store";
import useCumulativeCode from "../hooks/use-cumulative-code";
import useTypedDispatch from "../hooks/use-typed-dispatch";
import useTypedSelector from "../hooks/use-typed-selector";
import Resizable from "../Resizable/Resizable";
import classes from "./CodeCell.module.css";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";

interface CodeCellProps {
  id: Cell["id"];
}

const CodeCell: React.FC<CodeCellProps> = ({id}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const bundle = useTypedSelector((state) => state.bundle[id]);

  const cumulativeRawCode = useCumulativeCode(id);

  const message = {
    code: bundle ? bundle.code : "",
    error: bundle?.error,
  };

  const dispatch = useTypedDispatch();

  const rawCodeBundler = () => {
    dispatch(bundleProcessInit(id, cumulativeRawCode));
  };

  const prettierErrorHandler = (error: string) => {
    dispatch(bundleActions.end({ id, code: null, error: error }));
  };

  const previewWindow = bundle?.loading ? (
    <div className={classes["preview-loading"]}>
      <div className={classes["classic-5"]} />
    </div>
  ) : (
    <Preview message={message} />
  );

  const windowWidthUpdateHandler = useCallback((newWidth: number) => {
    setWindowWidth(newWidth);
  }, [])

  return (
    <div style={{ marginBottom: "25px" }}>
      <Resizable direction="vertical">
        <div
          className={`${classes["cyberpunk-container"]} ${classes.codecell} `}
        >
          <Resizable
            onWindowWithUpdate={windowWidthUpdateHandler}
            direction="horizontal"
          >
            <CodeEditor
              id={id}
              windowWidth={windowWidth}
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
