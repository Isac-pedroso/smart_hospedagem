import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RegistroPousada from "../../componentes/registroUser/registroPousada";
import RegistroHospede from "../../componentes/registroUser/registroHospede";
import { cadastraUsuario } from "../../services/userPrincipalService";
import type { UserPrincipalCadastroRequest } from "../../types/userPrincipal";


function Cadastro() {
  const [escolhaCadastro, setEscolhaCadastro] = useState<number>(1);


  const handleCadastroSubmit = async (dados: any) => {
    console.log("Dados: ", dados);



    const payload: UserPrincipalCadastroRequest = {
      usuarioPrincipalRequestDto: {
        email: dados.email,
        senha: dados.senha,
        tipo_cadastro: escolhaCadastro 
      },
      usuarioRequestDto: escolhaCadastro === 1 ? {
        nome: dados.nome,
        cpf: dados.cpf,
        dt_nascimento: dados.dt_nascimento
      } : null,
      pousadaRequestDto:  null
    };

    const responseCadastro = await cadastraUsuario(payload);
    console.log(responseCadastro)
  }



  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e') no-repeat center center/cover",
        paddingTop: "80px", // evita que a navbar fixe sobre o formulário
        paddingBottom: "40px",
      }}
    >
      <div
        className="card p-4 shadow-lg bg-light"
        style={{
          maxWidth: "450px",
          width: "100%",
          borderRadius: "15px",
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(255,255,255,0.9)",
        }}
      >
        <h3 className="text-center mb-4 fw-bold text-success">Cadastro</h3>
        <div className="mb-3">
          <label htmlFor="escolha_cadastro" className="form-label">
            Sou:
          </label>
          <select
            className="form-select"
            name="escolha_cadastro"
            onChange={(e) => setEscolhaCadastro(Number(e.target.value))}
            value={escolhaCadastro}
          >
            <option value="1">Hóspede</option>
            <option value="2">Pousada</option>
          </select>
        </div>

        {/* --- Formulário de Hóspede --- */}
        {escolhaCadastro === 1 && (
          <RegistroHospede onSubmit={handleCadastroSubmit} />
        )}

        {/* --- Formulário de Pousada --- */}
        {escolhaCadastro === 2 && (
          <RegistroPousada />
        )}

        <div className="text-center mt-3">
          <p>
            Já tem conta? <a href="#">Fazer Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
