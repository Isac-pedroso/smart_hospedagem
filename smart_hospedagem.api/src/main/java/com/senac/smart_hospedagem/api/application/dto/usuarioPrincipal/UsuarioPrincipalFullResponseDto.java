package com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal;

import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import com.senac.smart_hospedagem.api.domain.entity.Usuario;
import com.senac.smart_hospedagem.api.domain.entity.UsuarioPrincipal;

public record UsuarioPrincipalFullResponseDto(Usuario usuario, Pousada pousada) {
    public UsuarioPrincipalFullResponseDto(UsuarioPrincipal usuarioPrincipal){
        this(
            usuarioPrincipal.getUsuario(),
            usuarioPrincipal.getPousada()
        );
    }
}
