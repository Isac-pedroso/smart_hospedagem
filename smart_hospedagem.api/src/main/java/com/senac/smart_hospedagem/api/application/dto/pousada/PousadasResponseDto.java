package com.senac.smart_hospedagem.api.application.dto.pousada;

import com.senac.smart_hospedagem.api.domain.entity.Pousada;

import java.util.List;

public record PousadasResponseDto(List<Pousada> pousadas) {
}
