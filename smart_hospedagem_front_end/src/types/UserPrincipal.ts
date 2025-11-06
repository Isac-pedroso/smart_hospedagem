import type { PousadaResponse } from "./pousada"
import type { UsuarioResponse } from "./usuario"

export interface UserPrincipalResponse{
    email: string,
    nome: string,
    role: string
}

export interface UserPrincipalRequest{
    email: string,
}

export interface UserPrincipalCadastroRequest{
    usuarioPrincipalRequestDto: Record<string, any> | null,
    usuarioRequestDto: UsuarioResponse | null,
    pousadaRequestDto: PousadaResponse | null
}