import { MouseEventHandler } from "react";

// Componente representando uma tab individual.
function Tab({
  label,
  isActive,
  onClick,
  color = "#FFFFFF",
  }: {
  label: string;
  isActive: boolean;
  onClick: MouseEventHandler;
  color: string;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "8px 8px",
        borderRadius: "10px 10px 0 0",
        background: isActive ? "#3A5940" : "white",
        color: isActive ? "white" : "black",
        margin: "0",
        border: "1px #c7c7c7 solid",
        height: "15px",
        width: "130px",
        cursor: "pointer",
        transition: "all 0.3s",
        transform: isActive ? "height(-3px)" : "none",
        boxShadow: isActive ? "0 2px 5px rgba(0, 0, 0, 0.2)" : "none",
        fontSize: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // Centraliza horizontalmente o contêiner interno
        fontFamily: "Montserrat",
        fontWeight: 600,
      }}
    >
      <span style={{
        overflow: "hidden",       // Evita que o texto exceda o span
        textOverflow: "ellipsis", // Mostra reticências quando o texto é muito longo
        whiteSpace: "nowrap",     // Evita que o texto quebre em várias linhas
        maxWidth: "100%"          // Define a largura máxima do texto para o tamanho da tab
      }}>
        {label}
      </span>
    </div>
  );
}


export default Tab;
