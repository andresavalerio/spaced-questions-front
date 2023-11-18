import "./NoteEditor.css";
import React from "react";
import { NotebookTab } from "components/tab-bar/TabBar";

type NoteEditorProps = {
  autoSave?: boolean;
  onContentUpdate: (input: string, notebook: NotebookTab) => void;
};

type NoteEditorMethods = {
  isUpdated: () => boolean;
  setActiveNotebook: (notebook: NotebookTab) => void;
};

export type NoteEditorReference = NoteEditorMethods;

const NoteEditor = React.forwardRef<NoteEditorReference, NoteEditorProps>(
  ({ onContentUpdate }, ref) => {
    const [activeNotebook, setActiveTab] = React.useState<NotebookTab>();

    const [content, setContent] = React.useState<string>("");

    const isSelected = !!activeNotebook;

    React.useImperativeHandle(ref, () => {
      return {
        isUpdated: () => {
          return content === activeNotebook?.content;
        },
        setActiveNotebook: (newNotebook) => {
          const isOther = newNotebook.id !== activeNotebook?.id;

          if (isSelected && isOther) onContentUpdate(content, activeNotebook);

          if (!isOther) return;

          setContent(newNotebook.content);
          setActiveTab(newNotebook);
        },
      };
    });

    return (
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={(e) => {
          const hasContentChange = activeNotebook?.content != e.target.value;

          if (isSelected && hasContentChange)
            onContentUpdate(e.target.value, activeNotebook);
        }}
        className="textarea-editor"
        placeholder="Campo de texto.... Lorem ipsum dolom..."
      />
    );
  }
);

export default NoteEditor;
