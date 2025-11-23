import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";

import "./header_pousada.module.css";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/authSlice";
import { store } from "../../../store/store";
import { useEffect } from "react";

import { useModal } from "../../modal/ModalContext";
import { AlertModal } from "../../modal/modals/modalsPadrao/AlertModal";

interface HeaderPousadaProsps {
    children?: React.ReactNode;
}

const HeaderPousada: React.FC<HeaderPousadaProsps> = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {showModal} = useModal();

    const { user, token, isAuthenticated } = useSelector((state: any) => state.auth);


    useEffect(()=>{
        validaCadastroConcluido()
    }, []);

    const validaCadastroConcluido = () => {
        if(!user.cadastro_concluido){
            showModal(AlertModal, {
                titulo: "Mensagem cadastro",
                mensagem: "Conclua seu cadastro para sua pousada ficar visual aos hospedes!",
                onConfirm: () => navigate("/perfil_pousada")
            })
        }
    }


    const handleDeslogar = () => {
        dispatch(logout());
        navigate("/login");
    }

    return (
        <>
            
                {/* Sidebar */}
                <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar" style={{ width: '250px', height: '100vh', position: "fixed"}}>
                    <a
                        href="#"
                        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                    >
                        <i className="bi bi-house-door-fill me-2 fs-4"></i>
                        <span className="fs-5 fw-semibold">Painel Pousada</span>
                    </a>
                    <hr />

                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <NavLink to="" end className={({isActive}) => {  console.log("Dashboard ativo? ", isActive); return `nav-link text-white ${isActive ? 'active' : ''}`}}>
                                <i className="bi bi-speedometer2 me-2"></i>
                                Dashboard
                            </NavLink>
                        </li>
                        <li><NavLink to="/quartos_tarifas" className={({isActive}) => `nav-link text-white ${isActive ? 'active' : ''}`}><i className="bi bi-building me-2"></i> Quartos e Tarifas</NavLink></li>
                        <li><a href="#" className="nav-link text-white"><i className="bi bi-calendar-check me-2"></i> Reservas</a></li>
                        <li><a href="#" className="nav-link text-white"><i className="bi bi-people-fill me-2"></i> Hóspedes</a></li>
                        <li><a href="#" className="nav-link text-white"><i className="bi bi-cash-stack me-2"></i> Financeiro</a></li>
                        <li><a href="#" className="nav-link text-white"><i className="bi bi-chat-dots me-2"></i> Mensagens</a></li>
                        <li><a href="#" className="nav-link text-white"><i className="bi bi-bar-chart-line me-2"></i> Relatórios</a></li>
                        <li><a href="#" className="nav-link text-white"><i className="bi bi-star-fill me-2"></i> Avaliações</a></li>
                        <li><a href="#" className="nav-link text-white"><i className="bi bi-image me-2"></i> Galeria</a></li>
                        <li><a href="#" className="nav-link text-white"><i className="bi bi-megaphone me-2"></i> Promoções</a></li>
                        <li><a href="#" className="nav-link text-white"><i className="bi bi-gear me-2"></i> Configurações</a></li>
                    </ul>

                    <hr />

                    <div className="dropdown">
                        <a
                            href="#"
                            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                            id="dropdownUser1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
                                alt="Usuário"
                                width="32"
                                height="32"
                                className="rounded-circle me-2"
                            />
                            <strong>Usuário</strong>
                        </a>
                        <ul
                            className="dropdown-menu dropdown-menu-dark text-small shadow"
                            aria-labelledby="dropdownUser1"
                        >
                            <li><Link className="dropdown-item" to="/perfil_pousada" >Perfil</Link></li>
                            <li><a className="dropdown-item" href="#">Configurações</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#" onClick={handleDeslogar}>Sair</a></li>
                        </ul>
                    </div>
                </div>
            
        </>
    );
};

export default HeaderPousada;