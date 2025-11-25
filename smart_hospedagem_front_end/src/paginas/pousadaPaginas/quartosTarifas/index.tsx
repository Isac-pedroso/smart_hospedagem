import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./quartosTarifas.module.css";
import ResumoQuartos from "../../../componentes/quartosTarifas/ResumoQuartos";
import TabelaQuartos from "../../../componentes/quartosTarifas/TabelaQuartos";
import ModalQuarto from "../../../componentes/quartosTarifas/ModalQuarto";
import { AlertModal } from "../../../componentes/modal/modals/modalsPadrao/AlertModal";
import { useModal } from "../../../componentes/modal/ModalContext";
import ModalFotos from "../../../componentes/quartosTarifas/ModalFotos";

export default function QuartosTarifas() {
    const [quarto, setQuarto] = useState(null);
    const [quartos, setQuartos] = useState([
        {
            id: 1,
            nome: "Teste 1",
            descricao: "Descricao 1", 
            vl_por_pessoa: 155,
            desconto: 15,
            capacidade: 4,
            status_quarto: "Disponivel",
            pousda: 1
        }
    ]);


    const handlerGetQuartos = async () => {
        try{
            // const response = await 
        }catch(error){

        }
    }

    return (
        <div className="container-fluid p-4">

            {/* Título */}
            <h3 className="page-title mb-1">Quartos / Gerenciamento</h3>
            <p className="text-muted mb-4">Controle completo dos quartos da pousada</p>

            {/* Botão Novo */}
            <button className="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#modalQuarto" onClick={() => setQuarto(null)}>
                + Novo Quarto
            </button>

            <ResumoQuartos />
            <TabelaQuartos quartos={quartos} onEditar={setQuarto} />
            <ModalQuarto quarto={quarto}/>
            <ModalFotos/>

        </div>
    );
}
