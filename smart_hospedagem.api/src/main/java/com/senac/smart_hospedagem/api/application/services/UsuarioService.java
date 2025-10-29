package com.senac.smart_hospedagem.api.application.services;

import com.senac.smart_hospedagem.api.application.dto.loginUsuario.LoginUsuarioRequestDto;
import com.senac.smart_hospedagem.api.domain.entity.Usuario;
import com.senac.smart_hospedagem.api.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public boolean validarSenha(LoginUsuarioRequestDto login){
        return usuarioRepository.existsByEmailContainingAndSenha(login.email(), login.senha());
    }

    public Usuario buscarPorEmail(String email){
        Optional<Usuario> usuarioBD = usuarioRepository.findByEmail(email);
        Usuario usuarioPersist = new Usuario();

        usuarioPersist.setId(usuarioBD.get().getId());
        usuarioPersist.setUsuario(usuarioBD.get().getUsuario());
        usuarioPersist.setEmail(usuarioBD.get().getEmail());
        usuarioPersist.setRole(usuarioBD.get().getRole());

        return usuarioPersist;
    }

}
