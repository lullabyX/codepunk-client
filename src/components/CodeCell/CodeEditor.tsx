import Editor, { OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useRef } from "react";
import "../../cyberpunk.css";

import "./CodeEditor.css";
import "./syntex.css";

interface codeEditorProps {
  onBundle: (rawCode: string) => void;
}

const CodeEditor: React.FC<codeEditorProps> = (props) => {
  const editorRef = useRef<any>(null);

  const editorMountHandler: OnMount = (editor, _) => {
    editorRef.current = editor;
  };

  const previewHandler = () => {
    const rawCode: string = editorRef.current.getValue();
    if (rawCode.length !== 0) {
      props.onBundle(editorRef.current.getValue());
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
    <div className="editor-wrapper">
      <button
        className={`button-alt cyberpunk2077 green`}
        onClick={formatHandler}
      >
        Format_
      </button>
      <button
        className={`cyberpunk2077 purple button`}
        onClick={previewHandler}
      >
        Preview_
      </button>
      <Editor
        height="100%"
        language="javascript"
        theme="vs-dark"
        onMount={editorMountHandler}
        options={editorOptions}
      />
    </div>
  );
};

export default CodeEditor;
