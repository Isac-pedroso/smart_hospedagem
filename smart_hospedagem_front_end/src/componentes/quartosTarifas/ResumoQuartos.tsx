import type { ReactHTMLElement } from "react";


export default function ResumoQuartos(){

    return (
        <>{/* Cards Resumo */}
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
        </>
    );
}