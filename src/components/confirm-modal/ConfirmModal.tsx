
import './ConfirmModal.css';
import React, { useEffect, useRef } from "react";

interface ModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    name: string;
}

const ConfirmModal: React.FC<ModalProps> = ({ isOpen, onCancel, onConfirm, name }) => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
        onConfirm();
        }
    };

    const confirmButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isOpen) {
        confirmButtonRef.current?.focus();
        }
    }, [isOpen]);    
    if (!isOpen) return null;

    return (
        <div className="confirm-modal-background" onClick={onCancel}>
            <div 
                className="confirm-modal-content"
                onClick={e => e.stopPropagation()}  
                onKeyDown={handleKeyDown}
                tabIndex={0}
            >
                <div className="confirm-modal-title">
                    Deseja realmente excluir o caderno?
                </div>
                
                <div className="confirm-modal-item-name">          
                    {name}
                </div>
    
                <button onClick={onCancel} className="confirm-modal-button">
                    <div className="confirm-modal-button-text">
                        Cancelar
                    </div>
                </button>
    
                <button 
                    onClick={() => onConfirm()} 
                    ref={confirmButtonRef}
                    className="confirm-modal-button"
                >
                    <div className="confirm-modal-button-text">
                        Confirmar
                    </div>
                </button>
            </div>
        </div>
    );
}

export default ConfirmModal;
