package com.senac.smart_hospedagem.api.application.services;

import com.senac.smart_hospedagem.api.application.dto.loginUsuario.LoginUsuarioRequestDto;
import com.senac.smart_hospedagem.api.domain.entity.UsuarioPrincipal;
import com.senac.smart_hospedagem.api.domain.repository.UsuarioPrincipalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioPrincipalRepository usuarioRepository;

    public boolean validarSenha(LoginUsuarioRequestDto login){
        return usuarioRepository.existsByEmailContainingAndSenha(login.email(), login.senha());
    }

    public UsuarioPrincipal buscarPorEmail(String email){
        Optional<UsuarioPrincipal> usuarioBD = usuarioRepository.findByEmail(email);
        UsuarioPrincipal usuarioPersist = new UsuarioPrincipal();

        usuarioPersist.setId(usuarioBD.get().getId());
        usuarioPersist.setUsuario(usuarioBD.get().getUsuario());
        usuarioPersist.setEmail(usuarioBD.get().getEmail());
        usuarioPersist.setRole(usuarioBD.get().getRole());

        return usuarioPersist;
    }

}
