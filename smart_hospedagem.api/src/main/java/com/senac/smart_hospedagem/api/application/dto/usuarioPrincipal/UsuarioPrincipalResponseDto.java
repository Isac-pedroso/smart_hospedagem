package com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal;

import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaResponseDto;
import com.senac.smart_hospedagem.api.application.dto.usuario.UsuarioResponseDto;
import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import com.senac.smart_hospedagem.api.domain.entity.Usuario;
import com.senac.smart_hospedagem.api.domain.entity.UsuarioPrincipal;

public record UsuarioPrincipalResponseDto(Long id, String email, String senha, UsuarioResponseDto usuario, PousadaResponseDto pousada, String role) {
    public UsuarioPrincipalResponseDto(UsuarioPrincipal usuarioPrincipal){
        this(
                usuarioPrincipal.getId(),
                usuarioPrincipal.getEmail(),
                usuarioPrincipal.getSenha(),
                usuarioPrincipal.getUsuario() != null ? new UsuarioResponseDto(usuarioPrincipal.getUsuario()) : null,
                usuarioPrincipal.getPousada() != null ? new PousadaResponseDto(usuarioPrincipal.getPousada()) : null,
                usuarioPrincipal.getRole()
        );
    }
}
