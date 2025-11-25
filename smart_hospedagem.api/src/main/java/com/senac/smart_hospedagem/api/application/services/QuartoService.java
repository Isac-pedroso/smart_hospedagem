package com.senac.smart_hospedagem.api.application.services;

import com.senac.smart_hospedagem.api.application.dto.quarto.QuartoRequestDto;
import com.senac.smart_hospedagem.api.application.dto.quarto.QuartoResponseDto;
import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import com.senac.smart_hospedagem.api.domain.entity.Quarto;
import com.senac.smart_hospedagem.api.domain.entity.Status_quarto;
import com.senac.smart_hospedagem.api.domain.repository.PousadaRepository;
import com.senac.smart_hospedagem.api.domain.repository.QuartoRepository;
import com.senac.smart_hospedagem.api.domain.repository.StatusQuartoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuartoService {

    @Autowired
    private QuartoRepository quartoRepository;

    @Autowired
    private StatusQuartoRepository statusQuartoRepository;

    @Autowired
    private PousadaRepository pousadaRepository;


    public long trazQuantiadeQuartosPousada(Pousada pousada){
        long quantidade = quartoRepository.countByPousadaId(pousada.getId());

        return quantidade;
    }


    public QuartoResponseDto cadastrar(QuartoRequestDto request){
        Quarto quarto = new Quarto(request);

        Status_quarto status = statusQuartoRepository.getReferenceById(request.status_id());
        Pousada pousada = pousadaRepository.getReferenceById(request.pousada_id());

        quarto.setStatus(status);
        quarto.setPousada(pousada);

        quarto.setId(null);

        quartoRepository.save(quarto);

        return new QuartoResponseDto(quarto);
    }
}
