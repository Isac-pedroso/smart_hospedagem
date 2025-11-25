package com.senac.smart_hospedagem.api.application.dto.pousada;

import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import com.senac.smart_hospedagem.api.domain.entity.Quarto;

import java.util.List;

public record PousadaDetalhesResponseDto(Long id, String cnpj, String nome_fantasia, String razao_social, String nome_responsavel, String breve_descricao, String descricao, List<Quarto> quartos) {
    public PousadaDetalhesResponseDto(Pousada pousada){
        this(
                pousada.getId(),
                pousada.getCnpj(),
                pousada.getNome_fantasia(),
                pousada.getRazao_social(),
                pousada.getNome_responsavel(),
                pousada.getBreve_descricao(),
                pousada.getDescricao(),
                pousada.getQuartos()
        );
    }
}
