package com.senac.smart_hospedagem.api.application.dto.quarto;

import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import com.senac.smart_hospedagem.api.domain.entity.Quarto;
import com.senac.smart_hospedagem.api.domain.entity.Status_quarto;

public record QuartoResponseDto(Long id, String nome, String descricao, double vl_por_pessoa, double desconto, int capacidade, Long status_id, Long pousada_id) {
    public QuartoResponseDto(Quarto quarto){
        this(
                quarto.getId(),
                quarto.getNome(),
                quarto.getDescricao(),
                quarto.getVl_por_pessoa(),
                quarto.getDesconto(),
                quarto.getCapacidade(),
                quarto.getStatus().getId(),
                quarto.getPousada().getId()
        );
    }

}
