import axios from "axios";
import type { UserPrincipalCadastroRequest, UserPrincipalResponse } from "../types/UserPrincipal";
import { store } from "../store/store";
import ValidBR from "validbr";
import { useSelector } from "react-redux";
import type { UsuarioResponse } from "../types/usuario";
import type { PousadaResponse } from "../types/pousada";
import type { AtualizarDadosRequestDto } from "../types/UserPrincipal";

export async function getDadosFullUsuario(token: string) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await axios.get("http://localhost:8080/usuarioPrincipal/getDadosFullUsuario", config);
        
        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        if (response.data.data.pousada) {

            const url = response.data.data.pousada.foto_perfil;
            const urlPadronizada = url.replace(/\\/g, '/');
            const ultimaBarra = urlPadronizada.lastIndexOf("/");
            const nomeArquivo = urlPadronizada.substring(ultimaBarra+1)

            const pousada = {
                ...response.data.data.pousada,
                caminho_foto_perfil: `http://localhost:8080/uploads/${nomeArquivo}`
            }
            // response.data.data.pousada.push({foto_perfil_novo: ""})
            return { success: true, message: response.data.message, data: pousada };
        }

        if (response.data.data.usuario) {
            return { success: true, message: response.data.message, data: response.data.data.usuario };
        }

        return { success: true, message: response.data.message, data: response.data.data };

    } catch (error: any) {
        if (error.response) {
            return { success: false, message: error.response?.data?.message || error }
        } else {
            return { success: false, message: error.message || error }
        }
    }
}

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
        return { email: "", nome: "", role: "", cadastro_concluido: null };
    }
}

export async function cadastraUsuario(data: UserPrincipalCadastroRequest): Promise<any> {
    try {

        const usuarioPrincipal = data.usuarioPrincipalRequestDto;
        const usuarioHospede = data.usuarioRequestDto;
        const usuarioPousada = data.pousadaRequestDto;

        const validCamposPrincipais = await validCamposUsuarioPrincipal(usuarioPrincipal);

        const validarSenhas = await validSenhas(usuarioPrincipal);

        if (!validarSenhas.success) {
            throw new Error(validarSenhas.message);
        }

        if (!validCamposPrincipais.success) {
            throw new Error(validCamposPrincipais?.message);
        }

        // Valida se é HOSPEDE
        if (usuarioHospede) {

            // Valida campos HOSPEDE
            const validarCampos = await validCampos(usuarioHospede);

            if (!validarCampos.success) {
                throw new Error(validarCampos.message);
            }
            // Valida o cpf
            const validCpf = await validaCpf(usuarioHospede.cpf);

            if (!validCpf.success) {
                throw new Error(validCpf.message);
            }
        }

        // Valida se é POUSADAs
        if (usuarioPousada) {
            // Valida campos POUSADA
            const validarCampos = await validCampos(usuarioPousada);

            if (!validarCampos.success) {
                throw new Error(validarCampos.message);
            }

            // Valida o cnpj
            const validCnpj = await valiaCnpj(usuarioPousada.cnpj);


            if (!validCnpj.success) {
                throw new Error(validCnpj.message);
            }
        }

        const response = await axios.post("http://localhost:8080/usuarioPrincipal/cadastrar", data)

        if (response.status !== 200) {
            throw new Error("Ocorreu um problema ao cadastrar!");
        }

        return { success: true, message: "Cadastro concluido com sucesso!" };
    } catch (error: any) {
        if (error.response) {
            return {
                success: false,
                message: error.response.data.message
            }
        } else {
            console.error("Erro cadastro usuario: ", error.message || error)
            return { success: false, message: error.message || error };
        }

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


async function valiaCnpj(cnpj: string | null) {
    if (!cnpj) {
        return { success: false, message: "CNPJ não informado" };
    }

    const cnpjTratado = cnpj.replace(/[^\d]/g, "");

    const valid = ValidBR.cnpj.isValid(cnpjTratado);

    if (!valid) {
        return { success: false, message: "CNPJ invalido!" };
    }

    return { success: true, message: "CNPJ valido!" };
}


async function validCampos(usuario: Record<string, any>) {
    for (const [chave, valor] of Object.entries(usuario)) {
        if (valor === "" || valor === null || valor === "undefined") {

            var chaveRetorno = chave;

            if (chave === "dt_nascimento") chaveRetorno = "data de nascimento";
            if (chave === "nome_fantasia") chaveRetorno = "nome fantasia";
            if (chave === "razao_social") chaveRetorno = "razão social";
            if (chave === "nome_responsavel") chaveRetorno = "rome responsavels";

            return { success: false, message: `Campo ${chaveRetorno} invalido ou vazio!` };
        }
    }

    return { success: true, message: "Todos os campos são validos!" };
}

async function validCamposUsuarioPrincipal(usuarioPrincipal: Record<string, any> | null) {

    if (!usuarioPrincipal) {
        return { success: false, message: "Campos de usuario não informado!" };
    }

    for (const [chave, valor] of Object.entries(usuarioPrincipal)) {
        if (valor === "" || valor === null || valor === "undefined") {
            return { success: false, message: `Campo ${chave} invalido ou vazio!` };
        }

    }

    return { success: true, message: "Todos os campos são validos!" };
}

async function validSenhas(usuarioPrincipal: Record<string, any> | null) {

    if (!usuarioPrincipal) {
        return { success: false, message: "Campos de usuario não informados!" };
    }

    const senha = usuarioPrincipal.confirmarSenha;
    const confirmarSenha = usuarioPrincipal.senha;

    if (confirmarSenha === "" || confirmarSenha === null || confirmarSenha === "undefined") {
        return { success: false, message: "Campo de confirmação de senha invalido" };
    }

    if (confirmarSenha !== senha) {
        return { success: false, message: "As senhas devem ser iguais!" };
    }

    return { success: true, message: "Senhas iguais!" };
}

export async function atualizarDadosUsuario(usuario: UsuarioResponse | null, pousada: PousadaResponse | null, token: string, foto_perfil_editar: File | null) {
    try {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const data: AtualizarDadosRequestDto = {
            usuarioRequest: usuario,
            pousadaRequest: pousada
        }

        const response = await axios.put("http://localhost:8080/usuarioPrincipal/atualizarDados", data, config);

        if(foto_perfil_editar){
            const responseFotoPerfil = atualiarFotoPerfil(foto_perfil_editar, config);
            if(!responseFotoPerfil) throw new Error("Ocorreu um erro ao atualizar a foto de perfil!");
        }

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        return {
            success: true,
            message: response.data.message,
            data: response.data.data || null
        };

    } catch (error: any) {
        if (error.response) {
            return { success: false, message: error.response?.message || error }
        } else {
            return { success: false, message: error.message }
        }
    }
}

export async function validaEtapasCadastro(token: string) {
    try {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await axios.get("http://localhost:8080/usuarioPrincipal/validaEtapasConfiguracao", config);

        if (!response.data.success) throw new Error(response?.data?.message);

        return { success: true, message: response?.data?.message, data: response?.data?.data };


    } catch (error: any) {
        if (error.response) {
            return { success: false, message: error.response?.data?.message || error.message };
        } else {
            return { success: false, message: error };
        }
    }

}


async function atualiarFotoPerfil(foto: File, config: {}){
    try{
        const formData = new FormData();
        formData.append("file", foto);

        const response = await axios.post("http://localhost:8080/pousada/uploadFotoPerfil", formData, config)
        console.log(response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }

        return true;
    }catch(error: any){
        return false;
    }
}