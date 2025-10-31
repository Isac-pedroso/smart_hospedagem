package com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal;

import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import com.senac.smart_hospedagem.api.domain.entity.Usuario;

public record UsuarioPrincipalRequestDto(Long id, String email, String senha, String role, Usuario usuario, Pousada pousada, int tipo_cadastro) {
}
