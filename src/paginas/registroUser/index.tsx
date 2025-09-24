import React from "react";

function Cadastro() {
  
  return (
    <div 
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ 
        background: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e') no-repeat center center/cover"
      }}
    >
      <div className="card p-4 shadow-lg" style={{ maxWidth: "450px", width: "100%", borderRadius: "15px" }}>
        <h3 className="text-center mb-4 fw-bold">Cadastro</h3>
        
        <form>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome Completo</label>
            <input type="text" className="form-control" id="nome" placeholder="Digite seu nome completo" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input type="email" className="form-control" id="email" placeholder="Digite seu e-mail" />
          </div>

          <div className="mb-3">
            <label htmlFor="senha" className="form-label">Senha</label>
            <input type="password" className="form-control" id="senha" placeholder="Crie uma senha" />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmarSenha" className="form-label">Confirmar Senha</label>
            <input type="password" className="form-control" id="confirmarSenha" placeholder="Confirme sua senha" />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-success">Cadastrar</button>
          </div>

          <div className="text-center mt-3">
            <p>Já tem conta? <a href="#">Fazer Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;