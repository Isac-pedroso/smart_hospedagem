package com.senac.smart_hospedagem.api.application.services;

import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaRequestDto;
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

    public PousadaEtapasConfiguracao editarEtapaParaFalse(Pousada pousada, String etapa){

        Optional<PousadaEtapasConfiguracao> response = pousadaEtapasConfiguracaoRepository.findByIdAndEtapaContraing(pousada.getId(), etapa);

        PousadaEtapasConfiguracao configuracao = new PousadaEtapasConfiguracao();

        configuracao.setId(response.get().getId());
        configuracao.setAtualizado_em(LocalDateTime.now());
        configuracao.setConcluido(false);

        return pousadaEtapasConfiguracaoRepository.save(configuracao);
    }


    public List<PousadaEtapasConfiguracao> trasEtapasConfiguracoes(Pousada pousada){
        List<PousadaEtapasConfiguracao> response = pousadaEtapasConfiguracaoRepository.findByPousadaId(pousada.getId());

        return response;
    }
}
