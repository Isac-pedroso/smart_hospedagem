package com.senac.smart_hospedagem.api.domain.repository;

import com.senac.smart_hospedagem.api.domain.entity.GaleriaPousada;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GaleriaPousadaRepository extends JpaRepository<GaleriaPousada, Long> {

    long countByPousadaId(Long pousadaId);
}
