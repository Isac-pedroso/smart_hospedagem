package com.senac.smart_hospedagem.api.presetation;

import com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal.UsuarioPrincipalCadastroDto;
import com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal.UsuarioPrincipalRequestDto;
import com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal.UsuarioPrincipalResponseDto;
import com.senac.smart_hospedagem.api.application.services.UsuarioPrincipalService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarioPrincipal")
public class UsuarioPrincipalController {

    @Autowired
    private UsuarioPrincipalService usuarioPrincipalService;

    @PostMapping("/cadastrar")
    public ResponseEntity<UsuarioPrincipalResponseDto> cadastrar(@RequestBody UsuarioPrincipalCadastroDto usuarioPrincipalCadastroDto){
        try{
            var usuarioResponse = usuarioPrincipalService.cadastrar(usuarioPrincipalCadastroDto.usuarioPrincipalRequestDto(),
                    usuarioPrincipalCadastroDto.usuarioRequestDto(),
                    usuarioPrincipalCadastroDto.pousadaRequestDto());

            return ResponseEntity.ok(usuarioResponse);

        }catch(Exception $e){
            return ResponseEntity.badRequest().build();
        }
    }

}
