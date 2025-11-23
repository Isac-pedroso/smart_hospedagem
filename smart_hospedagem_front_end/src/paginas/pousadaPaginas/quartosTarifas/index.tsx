import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./quartosTarifas.module.css";

export default function QuartosTarifas() {
    return (
        <div className="container-fluid p-4">

            {/* Título */}
            <h3 className="page-title mb-1">Quartos / Gerenciamento</h3>
            <p className="text-muted mb-4">Controle completo dos quartos da pousada</p>

            {/* Botão Novo */}
            <button className="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#modalQuarto">
                + Novo Quarto
            </button>

            {/* Cards Resumo */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card text-white bg-primary">
                        <div className="card-body">
                            <h5>Total de Quartos</h5>
                            <h3>14</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-white bg-success">
                        <div className="card-body">
                            <h5>Disponíveis</h5>
                            <h3>10</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-white bg-warning">
                        <div className="card-body">
                            <h5>Ocupados</h5>
                            <h3>3</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-white bg-danger">
                        <div className="card-body">
                            <h5>Em Manutenção</h5>
                            <h3>1</h3>
                        </div>
                    </div>
                </div>
            </div>

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

                            {/* EXEMPLO de linhas — depois você substitui pelo map() */}
                            <tr>
                                <td>1</td>
                                <td>Quarto Standard</td>
                                <td>Confortável e econômico</td>
                                <td>R$ 150,00</td>
                                <td>10%</td>
                                <td><span className="badge bg-success">Disponível</span></td>
                                <td>3 fotos</td>
                                <td>
                                    <button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalQuarto">
                                        Editar
                                    </button>
                                    <button className="btn btn-sm btn-secondary ms-2" data-bs-toggle="modal" data-bs-target="#modalFotos">
                                        Fotos
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td>2</td>
                                <td>Suite Luxo</td>
                                <td>Vista para o mar</td>
                                <td>R$ 300,00</td>
                                <td>5%</td>
                                <td><span className="badge bg-warning">Ocupado</span></td>
                                <td>5 fotos</td>
                                <td>
                                    <button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalQuarto">
                                        Editar
                                    </button>
                                    <button className="btn btn-sm btn-secondary ms-2" data-bs-toggle="modal" data-bs-target="#modalFotos">
                                        Fotos
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL CADASTRO / EDIÇÃO DE QUARTO */}
            <div className="modal fade" id="modalQuarto">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Cadastro de Quarto</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <div className="row">

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nome do Quarto</label>
                                    <input type="text" className="form-control" placeholder="Ex: Suite Master" />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label className="form-label">Valor por Pessoa</label>
                                    <input type="number" className="form-control" placeholder="R$" />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label className="form-label">Desconto (%)</label>
                                    <input type="number" className="form-control" placeholder="0" />
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label className="form-label">Descrição</label>
                                    <textarea className="form-control" rows="3"></textarea>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Status</label>
                                    <select className="form-select">
                                        <option>Disponível</option>
                                        <option>Ocupado</option>
                                        <option>Manutenção</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Capacidade</label>
                                    <input type="number" className="form-control" placeholder="Nº de hóspedes" />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button className="btn btn-success">Salvar</button>
                        </div>

                    </div>
                </div>
            </div>

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

        </div>
    );
}
