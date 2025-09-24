import { Link } from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from 'react';
import { postResponse } from "../../utils/axios";

function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = async () => {
        
        try{   
            const data = {email: email, senha: senha};
            const response = await axios.post("http://localhost:8080/auth/login", data);

            if(response.status == 200){
                alert("Logado com sucesso!");
                return true;
            }
            
        }catch(error: any){
            alert(error)
            return false;
        }
    }

    return (
        <div
            className="d-flex align-items-center justify-content-center vh-100"
            style={{
                background: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e') no-repeat center center/cover",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
            <div className="card p-4 shadow-lg" style={{ maxWidth: "380px", width: "100%", borderRadius: "12px" }}>
                <h3 className="text-center mb-4 fw-bold">Login</h3>

                {/* Formulário de Login */}
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">E-mail</label>
                        <input
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="senha" className="form-label fw-semibold">Senha</label>
                        <input
                            onChange={e => setSenha(e.target.value)}
                            type="password"
                            className="form-control"
                            id="senha"
                            placeholder="Digite sua senha"
                            value={senha}
                        />
                    </div>

                    <div className="d-grid mb-2">
                        <button type="button" className="btn btn-success" onClick={handleLogin}>Entrar</button>
                    </div>

                    <div className="text-center mb-3">
                        <a href="#" className="small">Esqueceu a senha?</a>
                    </div>
                </form>

                <hr />

                {/* Botão de Cadastro */}
                <div className="text-center">
                    <p className="mb-2 small">Não tem conta?</p>
                    <Link to="/cadastro" className="btn btn-outline-primary w-100">Criar Conta</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;