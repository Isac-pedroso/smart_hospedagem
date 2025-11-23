package com.senac.smart_hospedagem.api.application.dto.pousadaEtapasConfiguracao;

import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import com.senac.smart_hospedagem.api.domain.entity.PousadaEtapasConfiguracao;

import java.time.LocalDateTime;
import java.util.List;

public record PousadaEtapasConfiguracaoResponseDto(Long id, String etapa, boolean concluido, LocalDateTime atualizadaEm) {
    public PousadaEtapasConfiguracaoResponseDto(PousadaEtapasConfiguracao configuracao){
        this(
                configuracao.getId(),
                configuracao.getEtapa(),
                configuracao.isConcluido(),
                configuracao.getAtualizado_em()
        );
    }

}
