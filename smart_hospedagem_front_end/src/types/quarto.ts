import type { Status_quarto } from "./status_quarto";


export interface QuartoResponseDto{
    id: number | null,
    nome: string | null,
    descricao: string | null, 
    vl_por_pessoa: number | null,
    desconto: number | null,
    capacidade: number  | null,
    status_quarto: number | null,
    pousada: number | null
}

export interface QuartoRequestDto{
    nome: string,
    descricao: string, 
    vl_por_pessoa: number,
    desconto: number,
    capacidade: number,
    status_id: number
}


export interface Quarto {
    id: number;
    nome: string;
    descricao: string;
    vl_por_pessoa: number;
    desconto: number;
    capacidade: number;
    status_id: Status_quarto;
}