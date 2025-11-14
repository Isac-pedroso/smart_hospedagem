package com.senac.smart_hospedagem.api.application.dto.pousadaEtapasConfiguracao;

import com.senac.smart_hospedagem.api.domain.entity.PousadaEtapasConfiguracao;

import java.util.List;

public record PousadaEtapasConfiguracaoResponseDto(List<PousadaEtapasConfiguracao> etapasConfiguracaos) {
}
