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
  tabColor
}: {
  content: string;
  onContentChange: (input: string) => void;
  tabColor: string;
}) {
  const lightenedColor = lightenColor(tabColor, 60);

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
          `repeating-linear-gradient(to bottom, ${lightenedColor}, ${lightenedColor} 20px, #000 20px, #000 21px)`,
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

const hexToHSL = (hex: string): [number, number, number] => {
  // Convertir hex para RGB primeiro
  let r = 0, g = 0, b = 0;

  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }

  // Então converter RGB para HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}

const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number): string => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0'); 
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const lightenColor = (hex: string, percent: number): string => {
  const [h, s, l] = hexToHSL(hex);
  return hslToHex(h, s, l + percent);
}

export default NoteEditor;
