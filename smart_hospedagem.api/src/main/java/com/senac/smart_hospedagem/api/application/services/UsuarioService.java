package com.senac.smart_hospedagem.api.application.services;

import com.senac.smart_hospedagem.api.application.dto.usuario.UsuarioRequestDto;
import com.senac.smart_hospedagem.api.application.dto.usuario.UsuarioResponseDto;
import com.senac.smart_hospedagem.api.domain.entity.Usuario;
import com.senac.smart_hospedagem.api.domain.entity.UsuarioPrincipal;
import com.senac.smart_hospedagem.api.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario cadastrar(UsuarioRequestDto usuarioRequestDto) throws Exception{

        var response = usuarioRepository.findByCpf(usuarioRequestDto.cpf());

        if(response.isPresent()){
            throw new Exception("CPF já existente!");
        }

        Usuario persist = new Usuario(usuarioRequestDto);

        usuarioRepository.save(persist);

        return persist;
    }

    public Usuario atualizarDados(UsuarioPrincipal usuarioPrincipal, UsuarioRequestDto usuarioRequest) throws Exception{

        Optional<Usuario> existente = usuarioRepository.findByCpf(usuarioRequest.cpf());

        if(existente.isPresent() && !existente.get().getCpf().equals(usuarioPrincipal.getUsuario().getCpf())){
            throw new Exception("CPF já existente!");
        }

        Usuario usuarioPersist = usuarioPrincipal.getUsuario();

        usuarioPersist.setId(usuarioPrincipal.getUsuario().getId());
        usuarioPersist.setCpf(usuarioRequest.cpf());
        usuarioPersist.setNome(usuarioRequest.nome());
        usuarioPersist.setDt_nascimento(usuarioRequest.dt_nascimento());
        usuarioPersist.setUsuarioPrincipal(usuarioPrincipal);

        return usuarioRepository.save(usuarioPersist);

    }
}
