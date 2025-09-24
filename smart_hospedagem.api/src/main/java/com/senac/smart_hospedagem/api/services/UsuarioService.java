package com.senac.smart_hospedagem.api.services;

import com.senac.smart_hospedagem.api.dto.LoginRequestDto;
import com.senac.smart_hospedagem.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public boolean validarSenha(LoginRequestDto login){
        return usuarioRepository.existsByEmailContainingAndSenha(login.email(), login.senha());
    }

}
