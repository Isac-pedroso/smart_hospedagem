import { Routes, Route} from 'react-router-dom';
import Footer from './componentes/footer/index.tsx'
import Header from './componentes/header/index.tsx'
import Home from './paginas/home.tsx';
import Login from './paginas/login.tsx';

function AppRoutes(){
    return(
        <>
            <Header />
            <>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />    
                </Routes>
            </>
            <Footer />
        </>
    );   
}

export default AppRoutes;