package com.senac.smart_hospedagem.api.application.services;

import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaRequestDto;
import com.senac.smart_hospedagem.api.application.dto.pousadaEtapasConfiguracao.PousadaEtapasConfiguracaoResponseDto;
import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import com.senac.smart_hospedagem.api.domain.entity.PousadaEtapasConfiguracao;
import com.senac.smart_hospedagem.api.domain.repository.PousadaEtapasConfiguracaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PousadaEtapasConfiguracaoService {
    @Autowired
    private PousadaEtapasConfiguracaoRepository pousadaEtapasConfiguracaoRepository;

    public List<PousadaEtapasConfiguracao> gravarEtapas(Pousada pousada){
        List<String> etapas = List.of("dados_perfil", "quartos", "galeria");

        List<PousadaEtapasConfiguracao> configuracaos = etapas.stream().map(etapa -> {

            PousadaEtapasConfiguracao configuracao = new PousadaEtapasConfiguracao();
            configuracao.setPousada(pousada);
            configuracao.setConcluido(false);
            configuracao.setEtapa(etapa);

            return configuracao;
        }).toList();

        pousada.getEtapas_configuracoes().addAll(configuracaos);
        return configuracaos;
    }

    public PousadaEtapasConfiguracao editarEtapaParaFalse(Pousada pousada, String etapa) throws Exception{

        PousadaEtapasConfiguracao response = pousadaEtapasConfiguracaoRepository.findByPousadaIdAndEtapa(pousada.getId(), etapa).orElseThrow(() -> new RuntimeException("Nenhuma etapa econtrada!"));

        response.setAtualizado_em(LocalDateTime.now());
        response.setConcluido(false);

        return pousadaEtapasConfiguracaoRepository.save(response);
    }


    public PousadaEtapasConfiguracao editarEtapaParaTrue(Pousada pousada, String etapa) throws Exception{

        PousadaEtapasConfiguracao response = pousadaEtapasConfiguracaoRepository.findByPousadaIdAndEtapa(pousada.getId(), etapa).orElseThrow(() -> new RuntimeException("Nenhuma etapa econtrada!"));

        response.setAtualizado_em(LocalDateTime.now());
        response.setConcluido(true);

        return pousadaEtapasConfiguracaoRepository.save(response);
    }


    public List<PousadaEtapasConfiguracaoResponseDto> trasEtapasConfiguracoes(Pousada pousada){
        List<PousadaEtapasConfiguracao> response = pousadaEtapasConfiguracaoRepository.findByPousadaId(pousada.getId());

        return response
                .stream()
                .map(configuracao -> new PousadaEtapasConfiguracaoResponseDto(configuracao))
                .toList();
    }
}
