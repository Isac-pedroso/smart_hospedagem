package com.senac.smart_hospedagem.api.application.dto.quarto;

import com.senac.smart_hospedagem.api.domain.entity.Quarto;

import java.util.List;

public record QuartosResponseDto(List<QuartoResponseDto> quartos) {
}
