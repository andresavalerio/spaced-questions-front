import React from 'react';
import './NoteEditor.css';

type NoteEditorProps = {
  content: string;
  onContentChange: (input: string) => void;
  forwardedRef: React.RefObject<HTMLTextAreaElement>;
}

function NoteEditor({ content, onContentChange, forwardedRef, }: NoteEditorProps) {
  return (
    <textarea
      ref={forwardedRef}
      value={content}
      onChange={(e) => onContentChange(e.target.value)}
      className="textarea-editor"
      placeholder='Campo de texto.... Lorem ipsum dolom...'
    />
  );
}

export default NoteEditor;
