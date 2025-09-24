import 'bootstrap/dist/css/bootstrap.min.css'

import './footer.module.css';
function Footer(){
    return(
        <footer className="bg-dark text-light text-center py-3 mt-auto">
            <div className="container">
                <p className="mb-0">
                &copy; {new Date().getFullYear()} Isacao Pedrosão. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}

export default Footer;