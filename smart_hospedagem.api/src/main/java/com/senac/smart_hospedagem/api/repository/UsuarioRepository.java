package com.senac.smart_hospedagem.api.repository;

import com.senac.smart_hospedagem.api.dto.LoginRequestDto;
import com.senac.smart_hospedagem.api.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    boolean existsByEmailContainingAndSenha(String email, String senha);
}
