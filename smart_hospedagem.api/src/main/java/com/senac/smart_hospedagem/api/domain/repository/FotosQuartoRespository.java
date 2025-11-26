package com.senac.smart_hospedagem.api.domain.repository;

import com.senac.smart_hospedagem.api.domain.entity.FotosQuarto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FotosQuartoRespository extends JpaRepository<FotosQuarto, Long> {

    List<FotosQuarto> findByQuartoId(Long quarto_id);
}
