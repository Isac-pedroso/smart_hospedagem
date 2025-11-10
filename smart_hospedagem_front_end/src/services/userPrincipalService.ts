import axios from "axios";
import type { UserPrincipalCadastroRequest, UserPrincipalResponse } from "../types/userPrincipal";
import { store } from "../store/store";
import ValidBR from "validbr";

export async function getDadosUsuarioPrincipal(token: string): Promise<UserPrincipalResponse> {
    try {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        console.log(token)
        console.log(config)

        const response = await axios.get<UserPrincipalResponse>("http://localhost:8080/usuarioPrincipal/getDadosUsuarioPrincipal", config);

        if (response.status !== 200) {
            throw new Error("Ocorreu um problema ao trazer os dados do usuario principal");
        }

        return response.data;
    } catch (error) {
        return { email: "", nome: "", role: "" };
    }
}

export async function cadastraUsuario(data: UserPrincipalCadastroRequest): Promise<any> {
    try {

        const usuarioPrincipal = data.usuarioPrincipalRequestDto;
        const usuarioHospede = data.usuarioRequestDto;

        const validCamposPrincipais = await validCamposUsuarioPrincipal(usuarioPrincipal);

        const validarSenhas = await validSenhas(usuarioPrincipal);

        if(!validarSenhas.success){
            throw new Error(validarSenhas.message);
        }
    
        if(!validCamposPrincipais.success){
            throw new Error(validCamposPrincipais?.message);
        }

        // Valida se é HOSPEDE
        if (usuarioHospede) {

            // Valida campos HOSPEDE
            const validCampos = await validCamposHospede(usuarioHospede);

            if (!validCampos.success) {
                throw new Error(validCampos.message);
            }
            // Valida o cpf
            const validCpf = await validaCpf(usuarioHospede.cpf);

            if (!validCpf.success) {
                throw new Error(validCpf.message);
            }
        }

        const response = await axios.post("http://localhost:8080/usuarioPrincipal/cadastrar", data)

        if (response.status !== 200) {
            throw new Error("Ocorreu um problema ao cadastrar!");
        }

        return {success: true, message: "Cadastro concluido com sucesso!"};
    } catch (error: any) {
        console.error("Erro cadastro usuario: ", error.message || error)
        return {success: false, message: error.message || error};
    }
}

async function validaCpf(cpf: string | null) {
    if (!cpf) {
        return { success: false, message: "CPF não informado" };
    }

    const cpfTratado = cpf.replace(/\D/g, "");

    const valid = ValidBR.cpf.isValid(cpfTratado);

    if (!valid) {
        return { success: false, message: "CPF invalido!" };
    }

    return { success: true, message: "CPF valido!" };
}

async function validCamposHospede(hospede: Record<string, any>) {
    for(const [chave, valor] of Object.entries(hospede)){
        if(valor === "" || valor === null || valor === "undefined"){
            return {success: false, message: `Campo ${chave == "dt_nascimento" ? "data de nascimento" : chave } invalido ou vazio!`};
        }
    }

    return {success: true, message: "Todos os campos são validos!"};
}

async function validCamposUsuarioPrincipal(usuarioPrincipal: Record<string, any> | null){
    
    if(!usuarioPrincipal){
        return {success: false, message: "Campos de usuario não informado!"};
    }

    for(const [chave, valor] of Object.entries(usuarioPrincipal)){
        if(valor === "" || valor === null || valor === "undefined"){
            return {success: false, message: `Campo ${chave} invalido ou vazio!`};
        }

    }

    return {success: true, message: "Todos os campos são validos!"};
}

async function validSenhas(usuarioPrincipal: Record<string, any> | null){

    if(!usuarioPrincipal){
        return {success: false, message: "Campos de usuario não informados!"};
    }

    const senha = usuarioPrincipal.confirmarSenha;
    const confirmarSenha = usuarioPrincipal.senha;

    if(confirmarSenha === "" || confirmarSenha === null || confirmarSenha === "undefined"){
        return {success: false, message: "Campo de confirmação de senha invalido"};
    } 

    if(confirmarSenha !== senha){
        return {success: false, message: "As senhas devem ser iguais!"};
    }

    return {success: true, message: "Senhas iguais!"};
}