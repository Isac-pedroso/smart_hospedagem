
import { useEffect, useState } from "react"
import type { Quarto, QuartoRequestDto } from "../../types/quarto"
import { useModal } from "../modal/ModalContext";
import { AlertModal } from "../modal/modals/modalsPadrao/AlertModal";
import { Cadastrar } from "../../services/quartoService";


interface ModalQuarto {
    quarto: Quarto | null,
    token: string | null,
    onGetQuartos: () => void
}

export default function ModalQuarto({ quarto, token = null , onGetQuartos}: ModalQuarto) {
    const [nome, setNome] = useState(quarto?.nome || "");
    const [vlPorPessoa, setVlPorPessoa] = useState(quarto?.vl_por_pessoa || 0);
    const [desconto, setDesconto] = useState(quarto?.desconto || 0);
    const [descricao, setDescricao] = useState(quarto?.descricao || "");
    const [statusQuarto, setStatusQuarto] = useState(quarto?.status_id.id || 1);
    const [capacidade, setCapacidade] = useState(quarto?.capacidade || 0);

    const { showModal, hideModal } = useModal();

    const handlerCadastroQuarto = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            const quartoRequest: QuartoRequestDto = {
                nome,
                descricao: descricao,
                vl_por_pessoa: vlPorPessoa,
                desconto: desconto,
                capacidade,
                status_id: statusQuarto
            }

            const response = await Cadastrar(quartoRequest, token);

            if(!response.success){
                throw new Error(response.message);
            }

            showModal(AlertModal, {
                titulo: "Mensagem cadastro",
                mensagem: response.message,
                onConfirm: hideModal
            })

            onGetQuartos;
            
        } catch (error: any) {
            console.error(error);
            showModal(AlertModal, {
                titulo: "Mensagem cadastro",
                mensagem: error?.message,
                onConfirm: hideModal
            })
        }
    }

    const hanlderAtualizarQuarto = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("ATUALIZANDO QUARTO")
    }

    return (
        <>
            {/* MODAL CADASTRO / EDIÇÃO DE QUARTO */}
            <div className="modal fade" id="modalQuarto">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <form onSubmit={quarto ? hanlderAtualizarQuarto : handlerCadastroQuarto}>

                            <div className="modal-header">
                                <h5 className="modal-title">{quarto ? "Editar quarto" : "Cadastro de Quarto"}</h5>
                                <button className="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Nome do Quarto</label>
                                        <input type="text" className="form-control" placeholder="Ex: Suite Master" value={quarto?.nome} onChange={(e) => setNome(e.target.value)} />
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <label className="form-label">Valor por Pessoa</label>
                                        <input type="number" className="form-control" placeholder="R$" value={quarto?.vl_por_pessoa}  onChange={(e) => setVlPorPessoa(parseFloat(e.target.value))}/>
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <label className="form-label">Desconto (%)</label>
                                        <input type="number" className="form-control" placeholder="0" value={quarto?.desconto}  onChange={(e) => setDesconto(parseFloat(e.target.value))}/>
                                    </div>

                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">Descrição</label>
                                        <textarea className="form-control" rows="3" value={quarto?.descricao}  onChange={(e) => setDescricao(e.target.value)}></textarea>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Status</label>
                                        <select className="form-select" value={quarto?.status_id?.id}  onChange={(e) => setStatusQuarto(parseInt(e.target.value))}>
                                            <option value={1}>Disponível</option>
                                            <option value={2}>Ocupado</option>
                                            <option value={3}>Manutenção</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Capacidade</label>
                                        <input type="number" className="form-control" placeholder="Nº de hóspedes" value={quarto?.capacidade}  onChange={(e) => setCapacidade(parseInt(e.target.value))} />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button className="btn btn-success" type="submit">{quarto ? "Editar" : "Salvar"}</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div >
        </>
    )
}