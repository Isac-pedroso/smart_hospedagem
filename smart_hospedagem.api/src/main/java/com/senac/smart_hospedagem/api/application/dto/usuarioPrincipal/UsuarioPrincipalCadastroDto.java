package com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal;

import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaRequestDto;
import com.senac.smart_hospedagem.api.application.dto.usuario.UsuarioRequestDto;

public record UsuarioPrincipalCadastroDto(UsuarioPrincipalRequestDto usuarioPrincipalRequestDto, UsuarioRequestDto usuarioRequestDto, PousadaRequestDto pousadaRequestDto) {
}
