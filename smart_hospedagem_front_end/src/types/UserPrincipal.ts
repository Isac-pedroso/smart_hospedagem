import type { PousadaRequest, PousadaResponse } from "./pousada"
import type { UsuarioResponse } from "./usuario"

export interface UserPrincipalResponse{
    email: string,
    nome: string,
    role: string,
    cadastro_concluido: boolean | null
}

export interface UserPrincipalRequest{
    email: string,
}

export interface UserPrincipalCadastroRequest{
    usuarioPrincipalRequestDto: Record<string, any> | null,
    usuarioRequestDto: UsuarioResponse | null,
    pousadaRequestDto: PousadaResponse | null
}


export interface AtualizarDadosRequestDto{
    usuarioRequest: UsuarioResponse | null,
    pousadaRequest: PousadaRequest | null
}
