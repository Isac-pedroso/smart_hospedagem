package com.senac.smart_hospedagem.api.application.dto.pousada;

import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import com.senac.smart_hospedagem.api.domain.entity.UsuarioPrincipal;

public record PousadaResponseDto (Long id, String cnpj, String nome_fantasia, String razao_social, String nome_responsavel, UsuarioPrincipal usuarioPrincipal){
    public PousadaResponseDto(Pousada pousada){
        this(
                pousada.getId(),
                pousada.getCnpj(),
                pousada.getNome_fantasia(),
                pousada.getRazao_social(),
                pousada.getNome_responsavel(),
                pousada.getUsuarioPrincipal()
        );
    }
}
