import "./NoteEditor.css";

type NoteEditorProps = {
  content: string;
  onContentChange: (input: string) => void;
};

function NoteEditor({ content, onContentChange }: NoteEditorProps) {
  return (
    <textarea
      value={content}
      className={".note-editor-textarea"}
      onChange={(e) => onContentChange(e.target.value)}
    />
  );
}

export default NoteEditor;
