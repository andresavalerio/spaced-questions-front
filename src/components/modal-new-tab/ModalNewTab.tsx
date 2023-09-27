import './ModalNewTab.css';
import React, { useState, useEffect, useRef } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (name: string) => void;
    purpose: "create" | "rename";  
    currentName: string;
  }

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, purpose, currentName }) => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
          event.preventDefault(); 
      
          if (name.trim() !== "") {
            onSave(name);
          }
        }
    };

  const [name, setName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setName(""); // Resetando o nome quando o modal fecha
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isOpen]);

  useEffect(() => {
    setName(purpose === "create" ? "" : currentName);
  }, [purpose, currentName]);

      
  if (!isOpen) return null;

  return (
    <div className="modal-background" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-title">
                { purpose === "create" ? "Novo Caderno" : "Renomear Caderno" }
            </div>        
            <div className="modal-label">
                Nome do caderno
            </div>
            <input 
                ref={inputRef}
                type="text"
                value={name} 
                onChange={e => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="modal-input"
            />
            <button onClick={onClose} className="modal-button">
                <div className="modal-button-text">
                    Cancelar
                </div>
            </button>
            <button onClick={() => onSave(name)} className="modal-button">
                <div className="modal-button-text">
                    <i className="fas fa-save icon-spacing"></i>
                    Salvar
                </div>
            </button>
        </div>
    </div>
  );
}

export default Modal;
