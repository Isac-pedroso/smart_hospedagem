package com.senac.smart_hospedagem.api.application.services;

import com.senac.smart_hospedagem.api.application.dto.galeria.GaleriaDto;
import com.senac.smart_hospedagem.api.domain.entity.Galeria;
import com.senac.smart_hospedagem.api.domain.entity.UsuarioPrincipal;
import com.senac.smart_hospedagem.api.domain.repository.GaleriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GaleriaService {
    @Autowired
    GaleriaRepository galeriaRepository;

    public Galeria cadastrar(GaleriaDto galeriaDto){

        Galeria galeriaPersist = new Galeria();
        UsuarioPrincipal usuario = new UsuarioPrincipal();

        usuario.setId(galeriaDto.getUsuario());

        galeriaPersist.setId(null);
        galeriaPersist.setTitulo(galeriaDto.getTitulo());
        galeriaPersist.setDescricao(galeriaDto.getDescricao());
        galeriaPersist.setUrl(galeriaDto.getUrl());
        galeriaPersist.setUsuario(usuario);

        return galeriaRepository.save(galeriaPersist);
    }

    public List<GaleriaDto> listarPorUsuario(Long id){
        List<Galeria> response = galeriaRepository.findByUsuarioId(id);

        return response.stream().map(GaleriaDto::new).toList();
    }

    public List<GaleriaDto> listar(){
        List<Galeria> response = galeriaRepository.findAll();

        return response.stream().map(GaleriaDto::new).toList();
    }
}
