package com.senac.smart_hospedagem.api.domain.repository;

import com.senac.smart_hospedagem.api.domain.entity.UsuarioPrincipal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioPrincipalRepository extends JpaRepository<UsuarioPrincipal, Long> {
    boolean existsByEmailContainingAndSenha(String email, String senha);
    Optional<UsuarioPrincipal> findByEmail(String email);

    @Query("""
            SELECT u FROM UsuarioPrincipal AS u
            LEFT JOIN FETCH u.usuario
            LEFT JOIN FETCH u.pousada
            WHERE u.id = :id
    """)
    Optional<UsuarioPrincipal> findByIdUserCompleto(@Param("id") Long id);
}
