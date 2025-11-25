package com.senac.smart_hospedagem.api.domain.repository;

import com.senac.smart_hospedagem.api.domain.entity.Status_quarto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusQuartoRepository extends JpaRepository<Status_quarto, Long> {
}
