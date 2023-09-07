import React from 'react';
import './NoteEditor.css';

/**
 * Componente NoteEditor
 * Representa uma área de texto onde o usuário pode editar o conteúdo do caderno.
 *
 * @param {string} content - Conteúdo atual da nota.
 * @param {function} onContentChange - Função callback chamada quando o conteúdo é alterado.
 */
function NoteEditor({
  content,
  onContentChange,
  forwardedRef,
}: {
  content: string;
  onContentChange: (input: string) => void;
  forwardedRef: React.RefObject<HTMLTextAreaElement>;
}) {
  return (
    <textarea
      ref={forwardedRef}
      value={content}
      onChange={(e) => onContentChange(e.target.value)}
      className="textarea-editor"
    />
  );
}

export default NoteEditor;
