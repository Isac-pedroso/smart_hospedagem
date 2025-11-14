package com.senac.smart_hospedagem.api.domain.repository;

import com.senac.smart_hospedagem.api.domain.entity.PousadaEtapasConfiguracao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PousadaEtapasConfiguracaoRepository extends JpaRepository<PousadaEtapasConfiguracao, Long> {

    Optional<PousadaEtapasConfiguracao> findByPousadaIdAndEtapa(Long id, String etapa);

    List<PousadaEtapasConfiguracao> findByPousadaId(Long id);
}
