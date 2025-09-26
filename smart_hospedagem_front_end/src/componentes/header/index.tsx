import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Header: React.FC = () => {
    const {user, hasRole, deslogar, loading } = useAuth();
    
    if(loading) return null;
    const navigate = useNavigate();

    const handleDeslogar = () => {
        deslogar();
        navigate("/login");    
        
    }

    return(
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow" style={{position: 'fixed', width: '100%', zIndex: 1}}>
                <div className="container">
                    <Link to="/" style={{cursor: "pointer"}} className="navbar-brand fw-bold">
                        Smart Hospedagem
                    </Link>
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
                            {user && user.role === "ROLE_ADMIN" && (
                                <>
                                <li style={{cursor: "pointer"}} className="nav-item">
                                    <Link to="/galeria" className="nav-link">
                                    Galeria
                                    </Link>
                                </li>
                                <li>
                                    <a className="nav-link" style={{color: "white", textDecoration: "none"}}>{user.email}</a>
                                </li>
                                <li style={{marginLeft: "10px"}}>
                                     <button onClick={handleDeslogar} className="btn btn-secondary">Sair</button>
                                </li>
                                </>
                            )}
                            {!user && (
                               <>
                                <li style={{cursor: "pointer"}} className="nav-item">
                                    <Link to="/" className="nav-link">
                                    Home
                                    </Link>
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
                                    <Link to="/login" className="btn btn-light fw-bold">
                                        <i className="bi bi-box-arrow-in-right me-1"></i> Login
                                    </Link>
                                </li>
                               </> 
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;