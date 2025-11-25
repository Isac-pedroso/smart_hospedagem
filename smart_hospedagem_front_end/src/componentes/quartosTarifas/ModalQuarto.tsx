
import { useEffect, useState } from "react"
import type { Quarto } from "../../types/quarto"


interface ModalQuarto {
    quarto: Quarto
}

export default function ModalQuarto({ quarto }: ModalQuarto) {
    const [status_quarto, setStatusQuarto] = useState([]);

    useEffect(() => {
        
    }, []);

    const handlerCadastroQuarto = () => {
        console.log("CADASTRANDO QUARTO")
    }

    const hanlderAtualizarQuarto = () => {
        console.log("ATUALIZANDO QUARTO")
    }

    return (
        <>
            {/* MODAL CADASTRO / EDIÇÃO DE QUARTO */}
            <div className="modal fade" id="modalQuarto">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">{quarto ? "Editar quarto" : "Cadastro de Quarto"}</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <div className="row">

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nome do Quarto</label>
                                    <input type="text" className="form-control" placeholder="Ex: Suite Master" value={quarto.nome} />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label className="form-label">Valor por Pessoa</label>
                                    <input type="number" className="form-control" placeholder="R$" value={quarto.vl_por_pessoa} />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label className="form-label">Desconto (%)</label>
                                    <input type="number" className="form-control" placeholder="0" value={quarto.desconto} />
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label className="form-label">Descrição</label>
                                    <textarea className="form-control" rows="3" value={quarto.descricao}></textarea>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Status</label>
                                    <select className="form-select" value={quarto.status_quarto}>
                                        <option>Disponível</option>
                                        <option>Ocupado</option>
                                        <option>Manutenção</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Capacidade</label>
                                    <input type="number" className="form-control" placeholder="Nº de hóspedes" value={quarto.capacidade}/>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button className="btn btn-success" onClick={quarto ? hanlderAtualizarQuarto : handlerCadastroQuarto}>{quarto ? "Editar" : "Salvar"}</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}