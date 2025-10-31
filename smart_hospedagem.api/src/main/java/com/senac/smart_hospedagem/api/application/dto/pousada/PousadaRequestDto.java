package com.senac.smart_hospedagem.api.application.dto.pousada;

import com.senac.smart_hospedagem.api.domain.entity.UsuarioPrincipal;

public record PousadaRequestDto (Long id, String cnpj, String nome_fantasia, String razao_social, String nome_responsavel, UsuarioPrincipal usuarioPrincipal){
}
