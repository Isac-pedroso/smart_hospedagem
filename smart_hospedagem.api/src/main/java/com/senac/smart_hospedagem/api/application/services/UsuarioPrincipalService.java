package com.senac.smart_hospedagem.api.application.services;

import com.senac.smart_hospedagem.api.application.dto.loginUsuario.LoginUsuarioRequestDto;
import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaRequestDto;
import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaResponseDto;
import com.senac.smart_hospedagem.api.application.dto.usuario.UsuarioRequestDto;
import com.senac.smart_hospedagem.api.application.dto.usuario.UsuarioResponseDto;
import com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal.UsuarioPrincipalRequestDto;
import com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal.UsuarioPrincipalResponseDto;
import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import com.senac.smart_hospedagem.api.domain.entity.Usuario;
import com.senac.smart_hospedagem.api.domain.entity.UsuarioPrincipal;
import com.senac.smart_hospedagem.api.domain.repository.UsuarioPrincipalRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public class UsuarioPrincipalService {
    @Autowired
    private UsuarioPrincipalRepository usuarioPrincipalRepository;

    public boolean validarSenha(LoginUsuarioRequestDto login){
        return usuarioPrincipalRepository.existsByEmailContainingAndSenha(login.email(), login.senha());
    }


    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PousadaService pousadaService;

    @Transactional
    public UsuarioPrincipalResponseDto cadastrar(UsuarioPrincipalRequestDto usuarioPrincipalRequestDto, UsuarioRequestDto usuarioRequestDto, PousadaRequestDto pousadaRequestDto) throws Exception{

        Optional<UsuarioPrincipal> response = usuarioPrincipalRepository.findByEmail(usuarioPrincipalRequestDto.email());

        if(response.isPresent()){
            throw new Exception("Usuario já existente!");
        }

        // Faz o cadastro dos dados do UsuarioPrincipal
        UsuarioPrincipal usuarioPrincipal = new UsuarioPrincipal(usuarioPrincipalRequestDto);

        switch (usuarioPrincipalRequestDto.tipo_cadastro()){
            case 1:
                // Cadastra usuario normal
                Usuario usuarioResponse = usuarioService.cadastrar(usuarioRequestDto);
                usuarioPrincipal.setUsuario(usuarioResponse);
                usuarioPrincipal.setRole("ROLE_USER");
                break;
            case 2:
                // Cadastra usuario empresa
                Pousada pousadaResponse = pousadaService.cadastrar(pousadaRequestDto);
                usuarioPrincipal.setPousada(pousadaResponse);
                usuarioPrincipal.setRole("ROLE_POUSADA");
                break;
            default:
                throw  new Exception("Nenhum tipo de cadastro selecionado!");
        }
        usuarioPrincipalRepository.save(usuarioPrincipal);

        return new UsuarioPrincipalResponseDto(usuarioPrincipal);
    }

}
