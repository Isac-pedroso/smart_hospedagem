import React, { Children, useEffect, useState, type ReactNode } from "react";
import { useModal } from "../modal/ModalContext";
import { AlertModal } from "../modal/modals/modalsPadrao/AlertModal";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { validaEtapasCadastro } from "../../services/userPrincipalService";

export const useValidacaoEtapasCadastro = () => {
    const [isValid, setIsValid] = useState(true);
    const { showModal, hideModal } = useModal();
    const location = useLocation();
    const navigate = useNavigate();

    const { user, token, isAuthenticated } = useSelector((state: any) => state.auth);

    useEffect(() => {
        if (!isAuthenticated) return;

        validacao();

    }, [location.pathname])

    const validacao = async () => {
        interface Etapa {
            id: number,
            etapa: string,
            concluido: boolean,
            atualizadoEm: string
        }
        const response = await validaEtapasCadastro(token);
        console.log(response);

        (response.data as Etapa[]).map((etapa: Etapa) => {
            console.log(etapa)

            if (!etapa.concluido) {
                showModal(AlertModal, {
                    titulo: "Mensagem sistema",
                    mensagem: getMensagemEtapa(etapa.etapa),
                    onConfirm: () => handlerRedirecionaPagina(etapa.etapa)
                })

                return;
            }
        })
    }

    function handlerRedirecionaPagina(etapa: string) {
        switch (etapa) {
            case "dados_perfil":
                navigate("/perfil_pousada")
                hideModal();
                return;
            case "quartos":
                navigate("/quartos")
                hideModal();
                return;
            case "galeria":
                navigate("/galeria")
                hideModal();
                return;
        }
    }

    function getMensagemEtapa(etapa: string) {

        switch (etapa) {
            case "dados_perfil":
                return "Finalize todas as etapas do cadastro da sua pousada para que ela apareça para os hóspedes. Comece preenchendo os dados do seu perfil."
            case "quartos":
                return "Quase lá! Cadastre pelo menos um quarto para que sua pousada possa receber reservas."
            case "galeria":
                return "Sua pousada quase está pronta! Adicione pelo menos uma foto à galeria para que os hóspedes possam conhecê-la."
        }
    }
}
