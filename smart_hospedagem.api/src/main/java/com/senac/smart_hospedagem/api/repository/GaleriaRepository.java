package com.senac.smart_hospedagem.api.repository;

import com.senac.smart_hospedagem.api.entity.Galeria;
import com.senac.smart_hospedagem.api.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GaleriaRepository extends JpaRepository<Galeria, Long> {

    List<Galeria> findByUsuarioId(Long id);
}
