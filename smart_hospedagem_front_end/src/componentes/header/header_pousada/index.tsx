import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./header_pousada.module.css";


const SidebarPousada: React.FC = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar">
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
                    <a href="#" className="nav-link active text-white">
                        <i className="bi bi-speedometer2 me-2"></i>
                        Dashboard
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <i className="bi bi-building-check me-2"></i>
                        Quartos e Tarifas
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <i className="bi bi-calendar-check me-2"></i>
                        Reservas
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <i className="bi bi-people-fill me-2"></i>
                        Hóspedes
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <i className="bi bi-cash-stack me-2"></i>
                        Financeiro
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <i className="bi bi-chat-dots me-2"></i>
                        Mensagens
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <i className="bi bi-bar-chart-line me-2"></i>
                        Relatórios
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <i className="bi bi-star-fill me-2"></i>
                        Avaliações
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <i className="bi bi-image me-2"></i>
                        Galeria
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <i className="bi bi-megaphone me-2"></i>
                        Promoções
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <i className="bi bi-gear me-2"></i>
                        Configurações
                    </a>
                </li>
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
                        alt=""
                        width="32"
                        height="32"
                        className="rounded-circle me-2"
                    />
                    <strong>Pousada Bela Vista</strong>
                </a>
                <ul
                    className="dropdown-menu dropdown-menu-dark text-small shadow"
                    aria-labelledby="dropdownUser1"
                >
                    <li>
                        <a className="dropdown-item" href="#">
                            Perfil
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                            Configurações
                        </a>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                            Sair
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SidebarPousada;