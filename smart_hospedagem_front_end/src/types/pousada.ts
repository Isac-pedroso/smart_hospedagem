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