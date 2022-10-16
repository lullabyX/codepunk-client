import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import "../../cyberpunk.css";
import { Cell, cellActions } from "../../store";

import "./CodeEditor.css";
import "./syntex.css";

interface codeEditorProps {
  id: Cell["id"];
  onBundle: (rawCode: string) => void;
  onPrettierError: (error: string) => void;
  windowWidth: number;
}

const CodeEditor: React.FC<codeEditorProps> = (props) => {
  const editorRef = useRef<any>(null);

  const dispatch = useDispatch();

  const editorMountHandler: OnMount = (editor, _) => {
    editorRef.current = editor;
  };

  const changeHandler: OnChange = (value, _) => {
    if (value) {
      dispatch(cellActions.update({ id: props.id, content: value }));
    }
  };

  const previewHandler = () => {
    const rawCode: string = editorRef.current.getValue();
    if (rawCode.length !== 0) {
      props.onBundle(rawCode);
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
        props.onPrettierError(error.message);
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
      <div
        className="button-container"
        style={{ width: props.windowWidth - 30 }}
      >
        <div>
          <button
            style={{ right: props.windowWidth * 0.4 - 10 }}
            className={`cyberpunk2077 green`}
            onClick={formatHandler}
          >
            Format_
          </button>
          <button
            style={{ right: props.windowWidth * 0.4 }}
            className={`cyberpunk2077 red`}
            onClick={previewHandler}
          >
            Preview_
          </button>
        </div>
      </div>
      <Editor
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
