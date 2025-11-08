import React from "react";


export const AlertModal: React.FC<any> = ({titulo, mensagem, onConfirm, onClose}) => {
    return (
        <div className="modal" tabIndex={-1} style={{ display: "flex", backgroundColor: "rgb(0,0,0,0.5)" }}>
            <div className="modal-dialog" style={{ width: "100%", marginTop: "20%" }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{titulo}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>{mensagem}</p>
                    </div>
                    <div className="modal-footer" style={{display: "flex", justifyContent: "center"}}>
                        <button type="button" className="btn btn-primary" onClick={onConfirm}>Ok</button>
                    </div>
                </div>
            </div>
        </div>
    )
}