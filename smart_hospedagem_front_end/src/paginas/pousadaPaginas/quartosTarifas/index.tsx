import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./quartosTarifas.module.css";
import ResumoQuartos from "../../../componentes/quartosTarifas/ResumoQuartos";
import TabelaQuartos from "../../../componentes/quartosTarifas/TabelaQuartos";
import ModalQuarto from "../../../componentes/quartosTarifas/ModalQuarto";
import { AlertModal } from "../../../componentes/modal/modals/modalsPadrao/AlertModal";
import { useModal } from "../../../componentes/modal/ModalContext";
import ModalFotos from "../../../componentes/quartosTarifas/ModalFotos";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { trazQuartosPousadaLogada } from "../../../services/quartoService";
import type { Quarto } from "../../../types/quarto";

export default function QuartosTarifas() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, token, isAuthenticated } = useSelector((state: any) => state.auth);

    const [quarto, setQuarto] = useState(null);
    const [quartos, setQuartos] = useState<Quarto[]>([]);
    
    const {showModal, hideModal} = useModal();

    useEffect(()=>{
        handlerGetQuartos();
    }, [])


    const handlerGetQuartos = async () => {
        try {
            console.log("AQUIULIAZANDO os dados");

            const response = await trazQuartosPousadaLogada(token);
            console.log(response)
            if(!response.success){
                throw new Error(response.message);
            }
            console.log("AQUI")
            console.log(response.data)
            setQuartos(response.data)
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
        <div className="container-fluid p-4">

            {/* Título */}
            <h3 className="page-title mb-1">Quartos / Gerenciamento</h3>
            <p className="text-muted mb-4">Controle completo dos quartos da pousada</p>

            {/* Botão Novo */}
            <button className="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#modalQuarto" onClick={() => setQuarto(null)}>
                + Novo Quarto
            </button>

            <ResumoQuartos />
            <TabelaQuartos quartos={quartos} onEditar={setQuarto} onFotosQuarto={setQuarto} onGetQuartos={handlerGetQuartos} />
            <ModalQuarto quarto={quarto} token={token} />
            <ModalFotos quarto={quarto} token={token} />

        </div>
    );
}
