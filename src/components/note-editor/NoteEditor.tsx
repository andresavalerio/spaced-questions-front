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
        width: "100%",
        minHeight: "400px",
        margin: 0,
        padding: "0 10px",
        lineHeight: "24px", // ajuste essa altura se necessário
        background:
          "repeating-linear-gradient(to bottom, #fff, #fff 20px, #e9e9e9 20px, #e9e9e9 21px)",
        backgroundPosition: "0 0", // para garantir que o background comece no topo
        border: "1.5px solid #ccc",
        fontFamily: "Arial, sans-serif",
        fontSize: "1.5em",
        boxSizing: "border-box",
        resize: "vertical",
      }}
    />
  );
}

export default NoteEditor;
