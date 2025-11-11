import { Outlet } from 'react-router-dom';
import Header from "../../header";
import Footer from "../../footer";


function LayoutPadrao() {
    return (
        <>

            <Header />
            <div>
                <>TESTE</>
                < Outlet />
            </div>
            <Footer />
        </>
    );
}

export default LayoutPadrao;