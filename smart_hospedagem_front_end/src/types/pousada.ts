import type { Quarto } from "./quarto"

export interface PousadaRequest{
    cnpj: string,
    nome_fantasia: string,
    razao_social: string,
    nome_responsavel: string
}

export interface PousadaResponse{
    cnpj: string,
    nome_fantasia: string,
    razao_social: string,
    nome_responsavel: string,
    descricao: string,
    breve_descricao: string
}
export interface PousadaCadastroResponse{
    cnpj: string,
    nome_fantasia: string,
    razao_social: string,
    nome_responsavel: string
}

export interface PousadaDetalhesRespoinse{
    cnpj: string,
    nome_fantasia: string,
    razao_social: string,
    foto_perfil: string,
    nome_responsavel: string,
    descricao: string,
    breve_descricao: string,
    quartos: Quarto[],
    galeriaPousada: []
}