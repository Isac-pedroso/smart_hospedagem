import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PousadaDetalhes.css";
import type { PousadaDetalhesRespoinse } from "../../types/pousada";
import { useModal } from "../../componentes/modal/ModalContext";
import { AlertModal } from "../../componentes/modal/modals/modalsPadrao/AlertModal";
import { trazDetalhesPousada } from "../../services/pousadaService";
import { useParams } from "react-router-dom";


const PousadaDetalhes = () => {
    const { showModal, hideModal } = useModal();
    const { id } = useParams();
    const [pousada, setPousada] = useState<PousadaDetalhesRespoinse>({
        cnpj: '',
        nome_fantasia: '',
        razao_social: '',
        foto_perfil: '',
        nome_responsavel: '',
        descricao: '',
        breve_descricao: '',
        quartos: [],
        galeriaPousada: []
    });


    useEffect(()=>{
        handlerGetDetalhesPousada();
    }, [])

    const handlerGetDetalhesPousada = async () => {
        try {

            if(!id){
                throw new Error("Pousada não selecionada");
            }

            const response = await trazDetalhesPousada(id);
            
            if (!response.success) {
                throw new Error(response.message);
            }

            setPousada(response.data);

        } catch (error: any) {
            showModal(AlertModal, {
                titulo: "Mensagem sistema",
                mensagem: error?.message,
                onConfirm: hideModal
            })
        }
    }

    return (
        <div className="container my-5">
            {/* Cabeçalho da Pousada */}
            <header className="text-center">
                <h1>{pousada.nome_fantasia}</h1>
                <p className="text-muted">{pousada.breve_descricao || "Descrição breve não disponível."}</p>
                <img
                    src={pousada.foto_perfil || "https://via.placeholder.com/600x300"}
                    alt="Foto de Perfil da Pousada"
                    className="img-fluid rounded"
                />
            </header>

            {/* Detalhes da Pousada */}
            <div className="row mt-4">
                <div className="col-md-6">
                    <h3>Informações da Pousada</h3>
                    <p><strong>Razão Social:</strong> {pousada.razao_social || "Não disponível"}</p>
                    <p><strong>Responsável:</strong> {pousada.nome_responsavel || "Não disponível"}</p>
                    <p><strong>CNPJ:</strong> {pousada.cnpj || "Não disponível"}</p>
                    <p><strong>Descrição:</strong> {pousada.descricao || "Sem descrição adicional."}</p>
                </div>

                {/* Galeria de Fotos */}
                <div className="col-md-6">
                    <h3>Galeria de Fotos</h3>
                    <div id="pousadaGallery" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">

                            <div className="carousel-item active">
                                <img
                                    src="https://via.placeholder.com/600x400"
                                    className="d-block w-100"
                                    alt="Imagem padrão"
                                />
                            </div>
                        </div>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#pousadaGallery"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#pousadaGallery"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Lista de Quartos */}
            <div className="mt-5">
                <h3>Quartos Disponíveis</h3>
                <div className="row">
                    {pousada.quartos.length > 0 ? (
                        pousada.quartos.map((quarto) => (
                            <div className="col-md-4 mb-4" key={quarto.id}>
                                <div className="card">
                                    <img
                                        src="https://via.placeholder.com/600x400"
                                        className="card-img-top"
                                        alt={quarto.nome}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{quarto.nome}</h5>
                                        <p className="card-text">{quarto.descricao}</p>
                                        <p><strong>Valor por Pessoa:</strong> R$ {quarto.vl_por_pessoa}</p>
                                        <p><strong>Capacidade:</strong> {quarto.capacidade} pessoas</p>
                                        <p><strong>Status:</strong> {quarto.status_id ? quarto.status_id.nome : "Não disponível"}</p>
                                        <button className="btn btn-success">Reservar</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum quarto disponível no momento.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PousadaDetalhes;
