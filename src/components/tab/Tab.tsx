import { MouseEventHandler, useState } from "react";

// Componente representando uma tab individual.
function Tab({
  label,
  isActive,
  onClick,
  color = "#FFFFFF",
  onRename,
}: {
  label: string;
  isActive: boolean;
  onClick: MouseEventHandler;
  color: string;
  onRename: (input: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newLabel, setNewLabel] = useState(label);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewLabel(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    onRename(newLabel);
  };

  return (
    <div
      onClick={onClick}
      onDoubleClick={!isEditing ? handleDoubleClick : undefined} // Evitar novo clique duplo enquanto edita
      style={{
        padding: "10px 20px",
        borderRadius: "0 8px 8px 8px",
        background: color,
        color: getTextColor(color),
        fontWeight: isActive ? "bold" : "normal",
        margin: "0 5px",
        cursor: "pointer",
        transition: "all 0.3s",
        transform: isActive ? "translateY(-3px)" : "none",
        boxShadow: isActive ? "0 2px 5px rgba(0, 0, 0, 0.2)" : "none",
        position: "relative",
      }}
    >
      {isEditing ? (
        <input
          value={newLabel}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
          style={{ width: "100%" }}
        />
      ) : (
        label
      )}
      {isActive && (
        <div
          style={{
            width: "0",
            height: "0",
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderTop: `10px solid ${color}`,
            position: "absolute",
            bottom: "-10px",
            left: "calc(50% - 10px)",
          }}
        ></div>
      )}
    </div>
  );
}

// Função para determinar a cor do texto com base na cor de fundo da tab.
// Se a cor de fundo for clara, retorna preto. Se for escura, retorna branco.
export function getTextColor(backgroundColor: string) {
  if (!backgroundColor || typeof backgroundColor !== "string") {
    return "black"; // ou outra cor padrão de sua preferência
  }

  const r = parseInt(backgroundColor.slice(1, 3), 16);
  const g = parseInt(backgroundColor.slice(3, 5), 16);
  const b = parseInt(backgroundColor.slice(5, 7), 16);

  // Calculando a luminância
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "black" : "white";
}

export default Tab;
