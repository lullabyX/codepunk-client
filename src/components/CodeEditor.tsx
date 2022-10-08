import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useRef } from "react";

import classes from "./CodeEditor.module.css";
interface codeEditorProps {
  onInputChange: (code: string) => void;
}

const CodeEditor: React.FC<codeEditorProps> = (props) => {
  const editorRef = useRef<any>(null);

  const editorMountHandler: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const editorChangeHandler: OnChange = (value, event) => {
    if (value) {
      props.onInputChange(value);
    }
  };

  const formatHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    const unformatted = editorRef.current.getValue();
    const formatted = prettier.format(unformatted, {
      parser: "babel",
      plugins: [parser],
      semi: true,
    });
    editorRef.current.setValue(formatted);
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
    <div className={classes["editor-wrapper"]}>
      <button onClick={formatHandler}>Format</button>
      <Editor
        height="500px"
        language="javascript"
        theme="vs-dark"
        onMount={editorMountHandler}
        onChange={editorChangeHandler}
        options={editorOptions}
      />
    </div>
  );
};

export default CodeEditor;
