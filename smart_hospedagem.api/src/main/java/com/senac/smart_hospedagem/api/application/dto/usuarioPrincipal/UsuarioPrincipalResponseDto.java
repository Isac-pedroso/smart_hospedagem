package com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal;

import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import com.senac.smart_hospedagem.api.domain.entity.Usuario;
import com.senac.smart_hospedagem.api.domain.entity.UsuarioPrincipal;

public record UsuarioPrincipalResponseDto(Long id, String email, String senha, Usuario usuario, Pousada pousada) {
    public UsuarioPrincipalResponseDto(UsuarioPrincipal usuarioPrincipal){
        this(
                usuarioPrincipal.getId(),
                usuarioPrincipal.getEmail(),
                usuarioPrincipal.getSenha(),
                usuarioPrincipal.getUsuario(),
                usuarioPrincipal.getPousada()
        );
    }
}
