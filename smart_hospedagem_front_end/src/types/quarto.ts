

export interface QuartoResponseDto{
    id: number | null,
    nome: string | null,
    descricao: string | null, 
    vl_por_pessoa: DoubleRange | null,
    desconto: DoubleRange | null,
    capacidade: number  | null,
    status_quarto: number | null,
    pousda: number | null
}

export interface QuartoRequestDto{
    nome: string,
    descricao: string, 
    vl_por_pessoa: number,
    desconto: number,
    capacidade: number,
    status_quarto: number,
    pousda: number
}


export interface Quarto {
    id: number;
    nome: string;
    descricao: string;
    vl_por_pessoa: number;
    desconto: number;
    capacidade: number;
    status_quarto: string;
    pousada: number;
}