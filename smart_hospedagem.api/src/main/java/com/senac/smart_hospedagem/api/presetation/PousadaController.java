package com.senac.smart_hospedagem.api.presetation;

import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaDetalhesResponseDto;
import com.senac.smart_hospedagem.api.application.dto.pousada.PousadasResponseDto;
import com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal.UsuarioPrincipalDto;
import com.senac.smart_hospedagem.api.application.services.PousadaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/pousada")
public class PousadaController {

    @Autowired
    private PousadaService pousadaService;


    @GetMapping("/listarPousadas")
    public ResponseEntity<?> listarPousadas(){
        try{

            PousadasResponseDto pousadasResponse = pousadaService.listarPousadas();

            return ResponseEntity.ok(Map.of("success", true, "message", "Pousadas retornadas com sucesso!", "data", pousadasResponse));
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }


    @GetMapping("/trazDetalhesPousada/{id}")
    public ResponseEntity<?> trazDetalhesPousada(@PathVariable Long id){
        try{

            PousadaDetalhesResponseDto pousadasResponse = pousadaService.trazDetalhesPousada(id);

            return ResponseEntity.ok(Map.of("success", true, "message", "Detalhes da pousada retornadas com sucesso!", "data", pousadasResponse));
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @PostMapping("/uploadFotoPerfil")
    public ResponseEntity<?> uploadFotoPerfil(@AuthenticationPrincipal UsuarioPrincipalDto usuarioLogado, @RequestParam("file") MultipartFile files){

        try{

            var pousadasResponse = pousadaService.uploadFotoPerfil(usuarioLogado, files);

            return ResponseEntity.ok(Map.of("success", true, "message", "Foto de perfil atualizada com sucesso!", "data", pousadasResponse));
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }

    }
}
