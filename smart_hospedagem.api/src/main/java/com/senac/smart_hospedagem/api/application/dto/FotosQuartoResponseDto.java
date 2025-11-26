package com.senac.smart_hospedagem.api.application.dto;

import com.senac.smart_hospedagem.api.domain.entity.FotosQuarto;

import java.util.List;

public record FotosQuartoResponseDto(List<FotosQuarto> fotos) {
}
