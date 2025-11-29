import { useEffect, useState } from "react";
import type { Quarto } from "../../types/quarto";
import { useModal } from "../modal/ModalContext";
import { AlertModal } from "../modal/modals/modalsPadrao/AlertModal";
import { deletarQuarto } from "../../services/quartoService";

interface TabelaQuartos {
    quartos: Quarto[];
    onEditar: (quarto: Quarto) => void;
    onFotosQuarto: (quarto: Quarto) => void;
    onGetQuartos: () => void;
    token: string
}

export default function TabelaQuartos({ quartos, onEditar, onFotosQuarto, onGetQuartos, token}: TabelaQuartos) {
    const {showModal, hideModal} = useModal();

    const handleExcluirQuarto = async (id_quarto: number) => {
        try {
            const response = await deletarQuarto(id_quarto, token);
            console.log(response)
            if (!response.success) {
                throw new Error(response.message);
            }

            // onGetQuartos();

            showModal(AlertModal, {
                titulo: "Mensagem sistema",
                mensagem: response.message,
                onConfirm: hideModal
            })
        } catch (error: any) {
            console.log(error.message)
            showModal(AlertModal, {
                titulo: "Mensagem sistema",
                mensagem: error?.message,
                onConfirm: hideModal
            })
        }
    }

    return (
        <>
            {/* Tabela de Quartos */}
            <div className="card shadow-sm">
                <div className="card-header">Lista de Quartos</div>
                <div className="table-responsive">
                    <table className="table table-striped mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Valor por Pessoa</th>
                                <th>Desconto</th>
                                <th>Status</th>
                                <th>Fotos</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quartos.map((quarto, index) => (
                                <tr key={quarto.id}>
                                    <td>{index + 1}</td>
                                    <td>{quarto.nome}</td>
                                    <td>{quarto.descricao}</td>
                                    <td>{quarto.vl_por_pessoa}</td>
                                    <td>{quarto.desconto}%</td>
                                    <td><span className="badge bg-success">{quarto.status_id.nome}</span></td>
                                    <td>3 fotos</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalQuarto" onClick={() => onEditar(quarto)}>
                                            Editar
                                        </button>
                                        <button style={{ marginTop: "5px" }} className="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#modalFotos" onClick={() => onFotosQuarto(quarto)}>
                                            Fotos
                                        </button>
                                        <button style={{ marginTop: "5px" }} className="btn btn-sm btn-danger" onClick={() => handleExcluirQuarto(quarto.id)}>
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}