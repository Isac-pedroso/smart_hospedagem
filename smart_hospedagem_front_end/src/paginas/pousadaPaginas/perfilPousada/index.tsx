import type React from "react";
import { useEffect, useState } from "react";
import "./perfilPousada.module.css";
import "../../css/carregamento-principal.css";
import { getDadosFullUsuario } from "../../../services/userPrincipalService";
import { useModal } from "../../../componentes/modal/ModalContext";
import { AlertModal } from "../../../componentes/modal/modals/modalsPadrao/AlertModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/authSlice";
import { atualizarDadosUsuario } from "../../../services/userPrincipalService";


const PerfilPousada: React.FC = () => {
    // Estado para controlar a edição
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const { showModal } = useModal();
    const { hideModal } = useModal();
    
    const token = useSelector((state: any) => state.auth.token);

    const dispatch = useDispatch();

    useEffect(() => {
        hideModal()
        console.log("USEEFFECT Executado")
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
        cnpj: "",
        nome_responsavel: "",
        breve_descricao: "",
        nome_fantasia: "",
        razao_social: "",
        descricao: ""
    });

    const handlerGetDadosPousada = async () => { 
        try {
            if(!token) throw new Error("Problema com login, por favor entre novamente no sistema !");
            
            const response = await getDadosFullUsuario(token);
            console.log(response)
            if (!response.success) throw new Error(response.message);
            
            setUserData(response.data);

            console.log(userData)
        } catch (error: any) {

            if(error.response?.status === 401){
                showModal(AlertModal, {
                    titulo: "Sessão expirada",
                    mensagem: "Sua sessão expirou. Faça login novamente",
                    onConfirm: () => {
                        hideModal;
                        dispatch(logout());
                    }
                })
            }else{
                showModal(AlertModal, {
                    titulo: "Mensagem sistema",
                    mensagem: error.message || "Problema ao carrega dados!",
                    onConfirm: () => hideModal()
                })
            }
        } finally {
            setLoading(false);
        }
    }

    const handlerAtualizarDados = async () => {
        setLoading(true);
        setTimeout(async ()=>{
            try{

                const response = await atualizarDadosUsuario(null, userData, token);
                console.log(response)
                if(!response?.success){
                    throw new Error(response?.message);
                }

                showModal(AlertModal, {
                    titulo: "Mensagem sistema",
                    mensagem: "Dados atualizados com sucesso!",
                    onConfirm: () => hideModal()
                })

            }catch(error: any){
                showModal(AlertModal, {
                    titulo: "Mensagem sistema",
                    mensagem: error.message || "Problema ao salvar dados!",
                    onConfirm: () => hideModal()
                })
            }finally{
                setIsEditing(false);
                setLoading(false);
            }
        }, 333)
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
                                            <p>{userData.cnpj ? userData.cnpj : "Não informado"}</p>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Nome Fantasia:</h6>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="nome_fantasia"
                                                value={userData.nome_fantasia}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <p>{userData.nome_fantasia ? userData.nome_fantasia : "Não informado"}</p>
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
                                                name="razao_social"
                                                value={userData.razao_social}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <p>{userData.razao_social ? userData.razao_social : "Não informado"}</p>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Nome Responsável:</h6>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="nome_responsavel"
                                                value={userData.nome_responsavel}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <p>{userData.nome_responsavel ? userData.nome_responsavel : "Não informado"}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <h6>Breve descrição:</h6>
                                        {isEditing ? (
                                            <textarea
                                                className="form-control"
                                                name="breve_descricao"
                                                value={userData.breve_descricao}
                                                onChange={handleInputChange}
                                                rows={5}
                                            />
                                        ) : (
                                            <p>{userData.breve_descricao ? userData.breve_descricao : "Não informado"}</p>
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
                                            <p>{userData.descricao ? userData.descricao : "Não informado"}</p>
                                        )}
                                    </div>
                                </div>

                                {isEditing && (
                                    <button className="btn btn-success mt-3" onClick={ handlerAtualizarDados}>
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