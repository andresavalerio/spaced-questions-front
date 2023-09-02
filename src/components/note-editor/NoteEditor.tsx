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
}: {
  content: string;
  onContentChange: (input: string) => void;
}) {
  return (
    <textarea
      // O valor atual do conteúdo.
      value={content}
      // Evento chamado ao alterar o conteúdo. Ele atualiza o valor no componente pai.
      onChange={(e) => onContentChange(e.target.value)}
      // Estilização da área de texto.
      style={{
        margin: "0 0 0 48px",
        width: "93.7%",
        minHeight: "500px",
        padding: "10px 15px",
        lineHeight: "30px", // ajuste essa altura se necessário
        border: "1px #c7c7c7 solid",
        fontSize: "0.63em",
        boxSizing: "border-box",
        resize: "vertical",
        borderRadius: "0 0 15px 15px",
        fontFamily: "Montserrat",
        fontWeight: "bold",
      }}
    />
  );
}


export default NoteEditor;
