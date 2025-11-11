import type React from "react";
import { useEffect, useState } from "react";
import "./perfilPousada.module.css";
import "../../css/carregamento-principal.css";
import { getDadosFullUsuario } from "../../../services/userPrincipalService";
import { useModal } from "../../../componentes/modal/ModalContext";
import { AlertModal } from "../../../componentes/modal/modals/modalsPadrao/AlertModal";
import { useSelector } from "react-redux";


const PerfilPousada: React.FC = () => {
    // Estado para controlar a edição
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const { showModal } = useModal();
    const { hideModal } = useModal();
    const token = useSelector((state: any) => state.auth.token);
    useEffect(() => {
        handlerGetDadosPousada();
    }, [token]);

    interface PousadaData {
        cnpj: string,
        foto: string,
        nome_fantasia: string,
        nome_responsavel: string,
        breve_descricao: string,
        razao_social: string,
        descricao: string
    }

    // Dados do perfil (para exemplo, você pode substituir com dados reais ou usar um hook como useState)
    const [userData, setUserData] = useState<PousadaData>({
        foto: "",
        nome_responsavel: "",
        breve_descricao: "",
        cnpj: "",
        nome_fantasia: "",
        razao_social: "",
        descricao: ""
    });


    const handlerGetDadosPousada = async () => {
        try {
            const response = await getDadosFullUsuario(token);
            
            if (!response.success) {
                throw new Error(response.message);
            }

            
        } catch (error: any) {

            if(error.response){
                showModal(AlertModal, {
                    titulo: "Mensagem sistema",
                    mensagem: error.response.message,
                    onConfirm: () => hideModal
                })
            }else{
                showModal(AlertModal, {
                    titulo: "Mensagem sistema",
                    mensagem: error.message | error,
                    onConfirm: () => hideModal
                })
            }
        } finally {
            setLoading(false);
        }
    }

    // Função para alternar entre visualização e edição
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    // Função para lidar com a mudança nos campos de input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    if (loading) return <div className="carregamento-principal"><h1>Carregando dados...</h1></div>;

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    {/* Coluna da foto e breve descrição */}
                    <div className="col-md-4">
                        <div className="card profile-card">
                            <div className="card-body text-center">
                                <img
                                    src={userData.foto}
                                    alt="Foto do perfil"
                                    className="img-fluid rounded-circle mb-3"
                                    style={{ width: "150px", height: "150px" }}
                                />
                                <h5 className="card-title">{userData.nome_responsavel}</h5>
                                <p className="card-text">{userData.breve_descricao}</p>
                                <button className="btn btn-outline-primary" onClick={toggleEdit}>
                                    {isEditing ? "Cancelar" : "Editar"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Coluna de informações da pousada */}
                    <div className="col-md-8">
                        <div className="card profile-card">
                            <div className="card-body">
                                <h4 className="card-title">Informações da Pousada</h4>
                                <hr />
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <h6>CNPJ:</h6>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="cnpj"
                                                value={userData.cnpj}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <p>{userData.cnpj}</p>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Nome Fantasia:</h6>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="nomeFantasia"
                                                value={userData.nome_fantasia}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <p>{userData.nome_fantasia}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <h6>Razão Social:</h6>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="razaoSocial"
                                                value={userData.razao_social}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <p>{userData.razao_social}</p>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Nome Responsável:</h6>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="nomeResponsavel"
                                                value={userData.nome_responsavel}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <p>{userData.nome_responsavel}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <h6>Descrição:</h6>
                                        {isEditing ? (
                                            <textarea
                                                className="form-control"
                                                name="descricao"
                                                value={userData.descricao}
                                                onChange={handleInputChange}
                                                rows={5}
                                            />
                                        ) : (
                                            <p>{userData.descricao}</p>
                                        )}
                                    </div>
                                </div>

                                {isEditing && (
                                    <button className="btn btn-success mt-3" onClick={() => alert("Dados atualizados!")}>
                                        Salvar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PerfilPousada;