package com.senac.smart_hospedagem.api.domain.repository;

import com.senac.smart_hospedagem.api.domain.entity.Quarto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuartoRepository extends JpaRepository<Quarto, Long> {
    long countByPousadaId(Long pousadaId);
}
