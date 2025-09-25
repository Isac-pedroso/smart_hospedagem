import { Routes, Route } from 'react-router-dom';
import Home from './paginas/home/index.tsx';
import Login from './paginas/login/index.tsx';
import Cadastro from './paginas/registroUser/index.tsx'
import Galeria from './paginas/galeria/index.tsx'
import LayoutAdmin from './componentes/LayoutAdmin/index.tsx';
import RecirecionaPorAutenticacao from './componentes/RecirecionaPorAutenticacao/index.tsx'
import ValidAutenticacao from './componentes/ValidAutenticacao/index.tsx';

function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path='/' element={<LayoutAdmin/>}>
                    <Route index element={<Home />} />
                    <Route path='/login' element={<RecirecionaPorAutenticacao><Login /></ RecirecionaPorAutenticacao >} />
                    <Route path='/cadastro' element={<RecirecionaPorAutenticacao><Cadastro /></ RecirecionaPorAutenticacao >} />
                    <Route path='/galeria' element={<ValidAutenticacao><Galeria /></ValidAutenticacao>} />
                </Route>
            </Routes>
        </>
    );
}

export default AppRoutes;