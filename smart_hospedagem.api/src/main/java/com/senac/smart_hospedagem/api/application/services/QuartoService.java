package com.senac.smart_hospedagem.api.application.services;

import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import com.senac.smart_hospedagem.api.domain.repository.QuartoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuartoService {

    @Autowired
    private QuartoRepository quartoRepository;

    public long trazQuantiadeQuartosPousada(Pousada pousada){
        long quantidade = quartoRepository.countByPousadaId(pousada.getId());

        return quantidade;
    }
}
