package com.senac.smart_hospedagem.api.application.services;

import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaRequestDto;
import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaResponseDto;
import com.senac.smart_hospedagem.api.application.dto.pousada.PousadasResponseDto;
import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import com.senac.smart_hospedagem.api.domain.entity.UsuarioPrincipal;
import com.senac.smart_hospedagem.api.domain.repository.PousadaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Pousada atualizarDados(UsuarioPrincipal usuarioPrincipal, PousadaRequestDto pousadaRequest) throws Exception{

        Optional<Pousada> existente = pousadaRepository.findByCnpj(pousadaRequest.cnpj());

        if(existente.isPresent() && !existente.get().getCnpj().equals(usuarioPrincipal.getPousada().getCnpj())){
            throw new Exception("CNPJ já existente!");
        }

        Pousada pousadaPersist = usuarioPrincipal.getPousada();

        pousadaPersist.setId(usuarioPrincipal.getPousada().getId());
        pousadaPersist.setCnpj(pousadaRequest.cnpj());
        pousadaPersist.setDescricao(pousadaRequest.descricao());
        pousadaPersist.setBreve_descricao(pousadaRequest.breve_descricao());
        pousadaPersist.setRazao_social(pousadaRequest.razao_social());
        pousadaPersist.setNome_responsavel(pousadaRequest.nome_responsavel());
        pousadaPersist.setNome_fantasia(pousadaRequest.nome_fantasia());
        pousadaPersist.setUsuarioPrincipal(usuarioPrincipal);

        return pousadaRepository.save(pousadaPersist);
    }
}
