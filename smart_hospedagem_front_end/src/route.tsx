import { Routes, Route } from 'react-router-dom';
import Home from './paginas/home/index.tsx';
import Login from './paginas/login/index.tsx';
import Cadastro from './paginas/registroUser/index.tsx'
// import Galeria from './paginas/galeria/index.tsx'
import RecirecionaPorAutenticacao from './componentes/RecirecionaPorAutenticacao/index.tsx'
import ValidAutenticacao from './componentes/ValidAutenticacao/index.tsx';
import LayoutSelector from './componentes/Layout/LayoutSelector/index.tsx';
import { useSelector } from 'react-redux';
import Dashboard from './paginas/pousadaPaginas/dashboard/index.tsx';
import PerfilPousada from './paginas/pousadaPaginas/perfilPousada/index.tsx';
import QuartosTarifas from './paginas/pousadaPaginas/quartosTarifas/index.tsx';
import PousadaDetalhes from './paginas/detalhesPousada/index.tsx';

function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path='/' element={<LayoutSelector />}>
                    <Route index element={<HomeRouteRedireciona />} />
                    <Route path='/login' element={<RecirecionaPorAutenticacao><Login /></ RecirecionaPorAutenticacao >} />
                    <Route path='/cadastro' element={<RecirecionaPorAutenticacao><Cadastro /></ RecirecionaPorAutenticacao >} />
                    <Route path='/perfil_pousada' element={<PerfilPousada />} />
                    <Route path='/quartos_tarifas' element={<QuartosTarifas />} />
                    <Route path='/detalhesPousada' element={<PousadaDetalhes />} />
                    {/* <Route path='/galeria' element={<ValidAutenticacao><Galeria /></ValidAutenticacao>} /> */}
                </Route>
            </Routes>
        </>
    );
}

export default AppRoutes;


const HomeRouteRedireciona: React.FC = () => {

    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    const user = useSelector((state: any) => state.auth.user);


    if(!isAuthenticated) return <Home />

    if(user?.role == "ROLE_POUSADA") return <Dashboard />

    return <Home />

}