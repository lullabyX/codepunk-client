import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import "../../cyberpunk.css";
import { Cell, cellActions } from "../../store";
import useTypedSelector from "../hooks/use-typed-selector";

import "./CodeEditor.css";
import "./syntex.css";

interface codeEditorProps {
  id: Cell["id"];
  onBundle: (rawCode: string) => void;
  onPrettierError: (error: string) => void;
  windowWidth: number;
}

const CodeEditor: React.FC<codeEditorProps> = ({
  id,
  onBundle,
  onPrettierError,
  windowWidth,
}) => {
  const editorRef = useRef<any>(null);
  const fetchedRawCode = useTypedSelector(
    (state) => state.cell.data[id].content
  );

  const dispatch = useDispatch();

  const editorMountHandler: OnMount = (editor, _) => {
    editorRef.current = editor;
  };

  const changeHandler: OnChange = (value, _) => {
    if (value) {
      dispatch(cellActions.update({ id: id, content: value }));
    }
  };

  const previewHandler = () => {
    const rawCode: string = editorRef.current.getValue();
    if (rawCode.length !== 0) {
      onBundle(rawCode);
    }
  };

  const formatHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    const unformatted = editorRef.current.getValue();
    let formatted = "";
    try {
      formatted = prettier.format(unformatted, {
        parser: "babel",
        plugins: [parser],
        semi: true,
      });
      editorRef.current.setValue(formatted);
    } catch (error) {
      if (error instanceof Error) {
        onPrettierError(error.message);
      }
    }
  };

  const editorOptions = {
    wordWrap: "on",
    minimap: {
      enabled: false,
    },
    tabsize: 2,
    lineNumbersMinChars: 3,
    showUnused: false,
    dragAndDrop: true,
    renderFinalNewline: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    folding: false,
  };

  return (
    <div className="editor-wrapper">
      <div className="button-container" style={{ width: windowWidth - 30 }}>
        <div>
          <button
            style={{ right: windowWidth * 0.4 - 10 }}
            className={`cyberpunk2077 green`}
            onClick={formatHandler}
          >
            Format_
          </button>
          <button
            style={{ right: windowWidth * 0.4 }}
            className={`cyberpunk2077 red`}
            onClick={previewHandler}
          >
            Preview_
          </button>
        </div>
      </div>
      <Editor
        value={fetchedRawCode}
        height="100%"
        language="javascript"
        theme="vs-dark"
        onMount={editorMountHandler}
        onChange={changeHandler}
        options={editorOptions}
      />
    </div>
  );
};

export default CodeEditor;
