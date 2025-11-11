package com.senac.smart_hospedagem.api.application.services;

import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaRequestDto;
import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaResponseDto;
import com.senac.smart_hospedagem.api.application.dto.pousada.PousadasResponseDto;
import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import com.senac.smart_hospedagem.api.domain.repository.PousadaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PousadaService {

    @Autowired
    private PousadaRepository pousadaRepository;



    public Pousada cadastrar(PousadaRequestDto pousadaRequestDto) throws Exception{
        var response = pousadaRepository.findByCnpj(pousadaRequestDto.cnpj());

        if(response.isPresent()){
            throw new Exception("CNPJ já existente!");
        }
        Pousada persist = new Pousada(pousadaRequestDto);
        pousadaRepository.save(persist);

        return persist;
    }


    public PousadasResponseDto listarPousadas(){
        List<Pousada> pousadasResponse = pousadaRepository.findAll();

        return new PousadasResponseDto(pousadasResponse);
    }
}
