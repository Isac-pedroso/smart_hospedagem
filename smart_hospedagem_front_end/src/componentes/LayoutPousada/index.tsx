import React from "react";
import HeaderPousada from "../header/header_pousada/index";
import { Outlet } from "react-router-dom";

const LayoutPousada: React.FC = () => {
    return(
        <>
            <HeaderPousada>
                <div>
                    <Outlet />
                </div>
            </HeaderPousada>
        </>
    )
}