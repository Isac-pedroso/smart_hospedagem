import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RegistroPousada from "../../componentes/registroUser/registroPousada";
import RegistroHospede from "../../componentes/registroUser/registroHospede";
import { cadastraUsuario } from "../../services/userPrincipalService";
import { useModal } from "../../componentes/modal/ModalContext";
import type { UserPrincipalCadastroRequest } from "../../types/userPrincipal";
import { ConfirmModal } from "../../componentes/modal/modals/modalsPadrao/ConfirmModal";
import { AlertModal } from "../../componentes/modal/modals/modalsPadrao/AlertModal";
import { useNavigate } from "react-router-dom";


function Cadastro() {
  const [escolhaCadastro, setEscolhaCadastro] = useState<number>(1);
  const { showModal } = useModal();
  const { hideModal } = useModal();
  const navigate = useNavigate();

  const handleCadastroSubmit = async (dados: any) => {
    console.log("Dados: ", dados);

    const payload: UserPrincipalCadastroRequest = {
      usuarioPrincipalRequestDto: {
        email: dados.email,
        senha: dados.senha,
        confirmarSenha: dados.confirmarSenha,
        tipo_cadastro: escolhaCadastro
      },
      usuarioRequestDto: escolhaCadastro === 1 ? {
        nome: dados.nome,
        cpf: dados.cpf,
        dt_nascimento: dados.dt_nascimento
      } : null,
      pousadaRequestDto: escolhaCadastro === 2 ? {
        cnpj: dados.cnpj,
        nome_fantasia: dados.nome_fantasia,
        razao_social: dados.razao_social,
        nome_responsavel: dados.nome_responsavel
      }: null
    };

    const responseCadastro = await cadastraUsuario(payload);

    if (!responseCadastro.success) {
      showModal(AlertModal, {
        titulo: "Mensagem cadastro",
        mensagem: responseCadastro.message,
        onConfirm: hideModal
      })
      return false;
    }
    
    showModal(AlertModal, {
      titulo: "Mensagem cadastro",
      mensagem: "Cadastrado com sucesso!",
      onConfirm: navigate("/login")
    })
    return true;
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
          <RegistroPousada onSubmit={handleCadastroSubmit}/>
        )}
        <div className="text-center mt-3">
          <p>
            Já tem conta? <a style={{color: "blue" , cursor: "pointer"}} onClick={() => navigate("/login")}>Fazer Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
