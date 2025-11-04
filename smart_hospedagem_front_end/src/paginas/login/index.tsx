import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { login } from "../../services/AuthService";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authSlice";
import { getDadosUsuarioPrincipal } from "../../services/userPrincipalService";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean | null>(false);

    useEffect(() => {

    }, [error]);

    const [formData, setFormData] = useState({
        email: "",
        senha: ""
    })

    const handlerLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);
        console.log(formData)
        const loginResponse = await login(formData);
        console.log(loginResponse)
        if (loginResponse.token === "") {
            alert("Login invalido");
            return;
        }

        const dadosUsuarioPrincipal = await getDadosUsuarioPrincipal(loginResponse.token);
        
        if(dadosUsuarioPrincipal.email === "" && dadosUsuarioPrincipal.nome === "" && dadosUsuarioPrincipal.role === ""){
            alert("Problema ao efetuar login!");
            return;
        }
        dispatch(loginSuccess({ user: { email: formData.email, nome: dadosUsuarioPrincipal.nome, role: dadosUsuarioPrincipal.role }, token: loginResponse.token }))
        navigate("/");
    };


    const handlerChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

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
                <form onSubmit={handlerLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">E-mail</label>
                        <input
                            onChange={handlerChangeInput}
                            type="email"
                            name="email"
                            className="form-control"
                            id="email"
                            placeholder="Digite seu e-mail"
                            value={formData.email}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="senha" className="form-label fw-semibold">Senha</label>
                        <input
                            onChange={handlerChangeInput}
                            type="password"
                            className="form-control"
                            id="senha"
                            name="senha"
                            placeholder="Digite sua senha"
                            value={formData.senha}
                        />
                    </div>

                    <div className="d-grid mb-2">
                        <button type="submit" className="btn btn-success">Entrar</button>
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
    )
}

export default Login;