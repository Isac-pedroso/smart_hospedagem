import { useEffect, useState } from "react";
import type { Quarto } from "../../types/quarto";

interface TabelaQuartos {
    quartos: Quarto[];
    onEditar: (quarto: Quarto) => void;
}

export default function TabelaQuartos({ quartos, onEditar }: TabelaQuartos) {
    
    useEffect(() => {
        console.log(quartos);
    }, [quartos]);

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
                                    <td>{index+1}</td>
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
                                        <button className="btn btn-sm btn-secondary ms-2" data-bs-toggle="modal" data-bs-target="#modalFotos">
                                            Fotos
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