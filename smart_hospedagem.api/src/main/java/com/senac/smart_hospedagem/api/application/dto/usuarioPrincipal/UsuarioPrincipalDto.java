package com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal;

import com.senac.smart_hospedagem.api.domain.entity.UsuarioPrincipal;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public record UsuarioPrincipalDto (Long id, String email, Collection<?extends GrantedAuthority> autorizacao){
    public UsuarioPrincipalDto(UsuarioPrincipal usuarioPrincipal){
        this(
                usuarioPrincipal.getId(),
                usuarioPrincipal.getEmail(),
                usuarioPrincipal.getAuthorities()
        );
    }
}
