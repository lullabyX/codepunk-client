import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import { useRef } from "react";

interface codeEditorProps {
  onInputChange: (code: string) => void;
}

const CodeEditor: React.FC<codeEditorProps> = (props) => {
  const editorRef = useRef<any>(null);

  const editorMountHandler: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monaco.editor.defineTheme("my-theme", {
      base: "vs",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#FFFF00",
      },
    });
    monaco.editor.setTheme("my-theme");
  };

  const editorChangeHandler: OnChange = (value, event) => {
    if (value) {
      props.onInputChange(value);
    }
  };

  return (
    <Editor
      height="500px"
      language="javascript"
      theme="my-theme"
      onMount={editorMountHandler}
      onChange={editorChangeHandler}
      options={{
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
      }}
    />
  );
};

export default CodeEditor;
