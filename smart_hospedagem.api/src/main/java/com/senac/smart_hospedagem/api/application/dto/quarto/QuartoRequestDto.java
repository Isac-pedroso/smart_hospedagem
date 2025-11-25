package com.senac.smart_hospedagem.api.application.dto.quarto;

import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import com.senac.smart_hospedagem.api.domain.entity.Status_quarto;

public record QuartoRequestDto(Long id, String nome, String descricao, double vl_por_pessoa, double desconto, int capacidade, Long status_id, Long pousada_id){
}
