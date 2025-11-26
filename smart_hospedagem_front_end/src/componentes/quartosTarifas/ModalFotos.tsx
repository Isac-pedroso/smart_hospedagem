import { useEffect, useState } from "react";
import { excluirFoto, trazFotosQuarto, uploadFoto } from "../../services/fotosQuartoService";
import type { Quarto } from "../../types/quarto"
import { useModal } from "../modal/ModalContext";
import { AlertModal } from "../modal/modals/modalsPadrao/AlertModal";
import type { fotoQuarto } from "../../types/fotosQuarto";


interface ModalFotos {
    quarto: Quarto | null,
    token: string | null
}

export default function ModalFotos({ quarto, token = null }: ModalFotos) {
    const { showModal, hideModal } = useModal();
    const [fotoSelecionada, setFotoSelecionada] = useState<File | null>(null);
    const [fotosQuarto, setFotosQuarto] = useState<fotoQuarto[]>([]);

    useEffect(() => {
        console.log(quarto);
        if (quarto?.id && token) {
            handleTrazFotosQuarto();
        }
    }, [quarto, token]);


    const handleTrazFotosQuarto = async () => {
        try {

            if (!quarto?.id) {
                throw new Error("Quarto não selecionados!");
            }

            console.log(token)

            const response = await trazFotosQuarto(quarto?.id, token)
            console.log(response)
            if (!response.success) {
                throw new Error(response.message);
            }

            setFotosQuarto(response.data.fotos);

        } catch (error: any) {
            console.error(error);
            showModal(AlertModal, {
                titulo: "Mensagem cadastro",
                mensagem: error?.message,
                onConfirm: hideModal
            })
        }
    }

    const handleAdicionarFotoQuarto = async () => {
        try {

            if (!quarto?.id || !fotoSelecionada) {
                throw new Error("Quarto ou foto não selecionados!");
            }

            const response = await uploadFoto(quarto?.id, fotoSelecionada, token)
            console.log(response)
            if (!response.success) {
                throw new Error(response.message);
            }

            showModal(AlertModal, {
                titulo: "Mensagem cadastro",
                mensagem: response.message,
                onConfirm: hideModal
            })

            handleTrazFotosQuarto();

        } catch (error: any) {
            console.error(error);
            showModal(AlertModal, {
                titulo: "Mensagem cadastro",
                mensagem: error?.message,
                onConfirm: hideModal
            })
        }
    }


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFotoSelecionada(e.target.files[0]);
        } else {
            setFotoSelecionada(null);
        }
    };


    const handleExcluirFoto = async (id_foto: number | null) => {
        try {

            if (!id_foto) {
                throw new Error("Foto não selecionada!");
            }

            const response = await excluirFoto(id_foto, token)
            console.log(response)
            if (!response.success) {
                throw new Error(response.message);
            }

            showModal(AlertModal, {
                titulo: "Mensagem sistema",
                mensagem: response.message,
                onConfirm: hideModal
            })

            handleTrazFotosQuarto();

        } catch (error: any) {
            showModal(AlertModal, {
                titulo: "Mensagem sistema",
                mensagem: error?.message,
                onConfirm: hideModal
            })
        }
    };

    return (
        <>
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
                            <input type="file" className="form-control mb-4" onChange={handleFileChange} />


                            <button className="btn btn-success" style={{ marginBottom: "10px" }} disabled={!fotoSelecionada} onClick={handleAdicionarFotoQuarto}>Adicionar</button>


                            <h6>Fotos do Quarto</h6>

                            <div className="row g-3" style={{ marginBottom: "25px" }}>

                                {fotosQuarto.length > 0 ? fotosQuarto.map((foto, index) => (
                                    <div className="col-md-3" key={foto.id}>
                                        <img
                                            src={foto.caminhoFoto?.toString()}
                                            alt="foto"
                                            className="photo-thumb mb-2"
                                            style={{ width: "100%", height: "80%", marginBottom: "0px !important" }}
                                        />
                                        <button className="btn btn-sm btn-danger w-100" style={{ marginTop: "10px" }} onClick={() => handleExcluirFoto(foto.id)}>
                                            Excluir
                                        </button>
                                    </div>
                                )) : <p>Nenhuma foto cadastrada para este quarto.</p>}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}