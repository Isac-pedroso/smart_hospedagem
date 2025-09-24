import { Outlet } from 'react-router-dom';
import Header from "../header";
import Footer from "../footer";

function LayoutAdmin() {
    return (
        <>
            <Header />
            <div>
                < Outlet />
            </div>
            <Footer />
        </>
    );
}

export default LayoutAdmin;