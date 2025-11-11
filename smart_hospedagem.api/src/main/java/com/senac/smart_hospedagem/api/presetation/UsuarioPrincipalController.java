package com.senac.smart_hospedagem.api.presetation;

import com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal.*;
import com.senac.smart_hospedagem.api.application.services.UsuarioPrincipalService;
import com.senac.smart_hospedagem.api.domain.entity.UsuarioPrincipal;
import org.apache.coyote.Response;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;

import java.util.Map;

@RestController
@RequestMapping("/usuarioPrincipal")
public class UsuarioPrincipalController {

    @Autowired
    private UsuarioPrincipalService usuarioPrincipalService;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody UsuarioPrincipalCadastroDto usuarioPrincipalCadastroDto){
        try{
            var usuarioResponse = usuarioPrincipalService.cadastrar(usuarioPrincipalCadastroDto.usuarioPrincipalRequestDto(),
                    usuarioPrincipalCadastroDto.usuarioRequestDto(),
                    usuarioPrincipalCadastroDto.pousadaRequestDto());

            return ResponseEntity.ok(Map.of("success", true, "message", "Cadastro realizado com sucesso!", "data", usuarioResponse));

        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @GetMapping("/getDadosUsuarioPrincipal")
    public ResponseEntity<UsuarioPrincipalSimplificadoResponseDto> getDadosUsuarioPrincipal(@AuthenticationPrincipal UsuarioPrincipalDto usuarioLogado){
        try{
            var usuarioResponse = usuarioPrincipalService.getDadosUsuarioPrincipal(usuarioLogado);

            return ResponseEntity.ok(usuarioResponse);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/getDadosFullUsuario")
    public ResponseEntity<?> getDadosFullUsuario(){
        try{
            var dadosUsuarioResponse = usuarioPrincipalService.getDadosFullUsuario();

            return ResponseEntity.ok(Map.of("success", true, "message", "Dados retornados com sucesso!", "data",dadosUsuarioResponse));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

}
