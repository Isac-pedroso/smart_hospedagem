import React from "react";
import HeaderPousada from "../../header/header_pousada";
import { Outlet } from "react-router-dom";
import Footer from "../../footer";

function LayoutPousada() {
    return (
        <>
            <div className="d-flex">
                <HeaderPousada />
                <div className="flex-gro p-4 w-100" style={{marginLeft: "250px", minHeight: "100vh"}}>
                    < Outlet />
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default LayoutPousada;