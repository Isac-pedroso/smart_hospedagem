import type React from "react"
import { useSelector } from "react-redux";
import LayoutPadrao from "../LayoutPadrao";
import LayoutPousada from "../LayoutPousada";
import { Outlet } from "react-router-dom";
import { useValidacaoEtapasCadastro } from "../../useValidacaoEtapasCadastro";

const LayoutSelector: React.FC = () => {

    useValidacaoEtapasCadastro();

    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    const user = useSelector((state: any) => state.auth.user);
    
    if(!isAuthenticated) return <LayoutPadrao />
    

    if(user?.role == "ROLE_POUSADA") return <LayoutPousada />


    return  <LayoutPadrao />
}

export default LayoutSelector;