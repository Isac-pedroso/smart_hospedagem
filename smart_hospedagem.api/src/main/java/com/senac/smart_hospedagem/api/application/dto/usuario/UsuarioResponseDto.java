package com.senac.smart_hospedagem.api.application.dto.usuario;

import com.senac.smart_hospedagem.api.domain.entity.Usuario;
import com.senac.smart_hospedagem.api.domain.entity.UsuarioPrincipal;

import java.util.Date;

public record UsuarioResponseDto (Long id, String nome, String cpf, Date dt_nascimento, UsuarioPrincipal usuarioPrincipal){
    public UsuarioResponseDto(Usuario usuario){
        this(usuario.getId(),
            usuario.getCpf(),
            usuario.getNome(),
            usuario.getDt_nascimento(),
            usuario.getUsuarioPrincipal()
        );
    }
}
