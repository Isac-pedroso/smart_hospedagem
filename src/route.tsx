import { Routes, Route } from 'react-router-dom';
import Home from './paginas/home/index.tsx';
import Login from './paginas/login/index.tsx';
import Cadastro from './paginas/registroUser/index.tsx'
import LayoutAdmin from './componentes/LayoutAdmin/index.tsx';

function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path='/' element={<LayoutAdmin/>}>
                    <Route index element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/cadastro' element={<Cadastro />} />
                </Route>
            </Routes>
        </>
    );
}

export default AppRoutes;