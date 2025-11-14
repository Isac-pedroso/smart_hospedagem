package com.senac.smart_hospedagem.api.application.services;

import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import com.senac.smart_hospedagem.api.domain.repository.GaleriaPousadaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GaleriaService {

    @Autowired
    private GaleriaPousadaRepository galeriaPousadaRepository;


    public long trazQuantiadeFotosGaleriaPousada(Pousada pousada){
        long quantidade = galeriaPousadaRepository.countByPousadaId(pousada.getId());

        return quantidade;
    }
}
