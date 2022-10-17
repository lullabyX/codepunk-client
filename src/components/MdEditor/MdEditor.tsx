import MDEditor from "@uiw/react-md-editor";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {Cell, cellActions} from "../../store";
import MoveCell from "../Cell/MoveCell";
import useTypedSelector from "../hooks/use-typed-selector";
import "./MdEditor.css";

interface MdEditorProps {
  id: Cell["id"];
}

const MdEditor: React.FC<MdEditorProps> = ({ id }) => {
  const [showEditor, setShowEditor] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const { content } = useTypedSelector((state) => state.cell.data[id]);

  const changeHandler = (text: string | undefined) => {
    dispatch(cellActions.update({ id: id, content: text ? text : "" }));
  };

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
      <div>
        <MoveCell isCodeCell={false} id={id} />
        <div
          className={`cyberpunk-md-preview dotted`}
          onDoubleClick={setShowEditor.bind(null, true)}
        >
          <MDEditor.Markdown
            source={content}
          />
        </div>
      </div>
    );
  }
  return (
    <div ref={editorRef}>
      <MDEditor
        className={`cyberpunk-md-editor`}
        value={content}
        onChange={changeHandler}
      />
    </div>
  );
};

export default MdEditor;
