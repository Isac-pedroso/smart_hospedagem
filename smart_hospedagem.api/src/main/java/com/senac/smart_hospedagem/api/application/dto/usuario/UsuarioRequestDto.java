package com.senac.smart_hospedagem.api.application.dto.usuario;

import com.senac.smart_hospedagem.api.domain.entity.UsuarioPrincipal;

import java.util.Date;

public record UsuarioRequestDto (Long id, String nome, String cpf, Date dt_nascimento, UsuarioPrincipal usuarioPrincipal){
}
