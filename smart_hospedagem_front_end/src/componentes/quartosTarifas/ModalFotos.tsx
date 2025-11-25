


export default function ModalFotos() {
    return (
        <>
            {/* MODAL DE FOTOS */}
            <div className="modal fade" id="modalFotos">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Gerenciar Fotos</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">

                            <h6>Adicionar Foto</h6>
                            <input type="file" className="form-control mb-4" />

                            <h6>Fotos do Quarto</h6>

                            <div className="row g-3">

                                {[1, 2, 3].map((i) => (
                                    <div className="col-md-3" key={i}>
                                        <img
                                            src="https://via.placeholder.com/140"
                                            alt="foto"
                                            className="photo-thumb mb-2"
                                        />
                                        <button className="btn btn-sm btn-danger w-100">
                                            Excluir
                                        </button>
                                    </div>
                                ))}

                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}