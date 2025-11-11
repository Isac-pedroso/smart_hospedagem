import React from "react";


const Dashboard: React.FC = () => {
    const resumo = {
        ocupacaoAtual: "75%",
        reservasHoje: 12,
        hospedesConfirmados: 20,
        hospedesPendentes: 5
    };

    return (
        <div className="container-fluid">
            {/* Título */}
            <div className="mb-4">
                <h1 className="h3 fw-bold">🏠 Painel Inicial / Dashboard</h1>
                <p className="text-muted">Resumo rápido da pousada</p>
            </div>

            {/* Cards de resumo */}
            <div className="row g-3">
                <div className="col-md-3">
                    <div className="card text-white bg-primary h-100">
                        <div className="card-body">
                            <h5 className="card-title">Ocupação Atual</h5>
                            <p className="card-text display-6">{resumo.ocupacaoAtual}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-white bg-success h-100">
                        <div className="card-body">
                            <h5 className="card-title">Reservas Hoje</h5>
                            <p className="card-text display-6">{resumo.reservasHoje}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-white bg-warning h-100">
                        <div className="card-body">
                            <h5 className="card-title">Hóspedes Confirmados</h5>
                            <p className="card-text display-6">{resumo.hospedesConfirmados}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-white bg-danger h-100">
                        <div className="card-body">
                            <h5 className="card-title">Hóspedes Pendentes</h5>
                            <p className="card-text display-6">{resumo.hospedesPendentes}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Exemplo de tabela de reservas */}
            <div className="mt-5">
                <h4>Reservas de Hoje</h4>
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Nome do Hóspede</th>
                                <th>Quarto</th>
                                <th>Status</th>
                                <th>Check-in</th>
                                <th>Check-out</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>João Silva</td>
                                <td>101</td>
                                <td>
                                    <span className="badge bg-success">Confirmado</span>
                                </td>
                                <td>11/11/2025</td>
                                <td>13/11/2025</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Maria Oliveira</td>
                                <td>102</td>
                                <td>
                                    <span className="badge bg-warning text-dark">Pendente</span>
                                </td>
                                <td>11/11/2025</td>
                                <td>12/11/2025</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Carlos Pereira</td>
                                <td>103</td>
                                <td>
                                    <span className="badge bg-success">Confirmado</span>
                                </td>
                                <td>11/11/2025</td>
                                <td>14/11/2025</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;