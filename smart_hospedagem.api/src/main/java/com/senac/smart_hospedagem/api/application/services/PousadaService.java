package com.senac.smart_hospedagem.api.application.services;

import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaRequestDto;
import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaResponseDto;
import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import com.senac.smart_hospedagem.api.domain.repository.PousadaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PousadaService {

    @Autowired
    private PousadaRepository pousadaRepository;



    public Pousada cadastrar(PousadaRequestDto pousadaRequestDto){

        Pousada persist = new Pousada(pousadaRequestDto);

        pousadaRepository.save(persist);

        return persist;
    }
}
