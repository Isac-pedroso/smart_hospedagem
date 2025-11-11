package com.senac.smart_hospedagem.api.domain.repository;

import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PousadaRepository extends JpaRepository<Pousada, Long> {

    Optional<Pousada> findByCnpj(String cnpj);
}
