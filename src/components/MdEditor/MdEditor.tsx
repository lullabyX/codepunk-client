import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import "./MdEditor.css";

const MdEditor: React.FC = () => {
  const [mdValue, setMdValue] = useState<string | undefined>("# Skippy!");
  const [showEditor, setShowEditor] = useState(true);
  const editorRef = useRef<HTMLDivElement>(null);

  document.documentElement.setAttribute("data-color-mode", "dark");

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        editorRef.current &&
        event.target &&
        editorRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setShowEditor(false);
    };

    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (!showEditor) {
    return (
      <div
        className={`cyberpunk-md-preview dotted`}
        onDoubleClick={setShowEditor.bind(null, true)}
      >
        <MDEditor.Markdown
          source={mdValue}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>
    );
  }
  return (
    <div className={`cyberpunk-md-editor-container`} ref={editorRef}>
      <MDEditor
        className={`cyberpunk-md-editor`}
        value={mdValue}
        onChange={setMdValue}
      />
    </div>
  );
};

export default MdEditor;
