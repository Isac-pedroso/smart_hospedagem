import React from "react";

export const ConfirmModal: React.FC<any> = ({ titulo, mensagem, onConfirm, onClose }) => {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h3>{titulo}</h3>
                <p>{mensagem}</p>
                <div className="actions">
                    <button onClick={onConfirm}>Confirmar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}
