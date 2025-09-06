import { useNavigate } from "react-router-dom";

function Header(){
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");    
    };

    const handleHomeClick = () => {
        navigate("/");
    };

    return(
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow" style={{position: 'fixed', width: '100%'}}>
                <div className="container">
                    <a className="navbar-brand fw-bold" href="#">
                        Smart Hospedagem
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a href="" onClick={handleHomeClick} className="nav-link">
                                Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                Sobre
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                Serviços
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                Contato
                                </a>
                            </li>
                            <li>
                                <a onClick={handleLoginClick} className="btn btn-light fw-bold">
                                    <i className="bi bi-box-arrow-in-right me-1"></i> Login
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;