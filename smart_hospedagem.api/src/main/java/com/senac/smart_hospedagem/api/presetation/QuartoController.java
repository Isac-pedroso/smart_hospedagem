package com.senac.smart_hospedagem.api.presetation;

import com.senac.smart_hospedagem.api.application.dto.quarto.QuartoRequestDto;
import com.senac.smart_hospedagem.api.application.dto.quarto.QuartoResponseDto;
import com.senac.smart_hospedagem.api.application.dto.quarto.QuartosResponseDto;
import com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal.UsuarioPrincipalDto;
import com.senac.smart_hospedagem.api.application.services.QuartoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/quarto")
public class QuartoController {
    @Autowired
    private QuartoService quartoService;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@AuthenticationPrincipal UsuarioPrincipalDto usuarioLogado, @RequestBody QuartoRequestDto request){
        try{
            var quartoRespoonse = quartoService.cadastrar(usuarioLogado,request);
            return ResponseEntity.ok(Map.of("success", true, "message", "Cadastro realizado com sucesso!", "data", quartoRespoonse));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("success", false, "mensagem", e.getMessage()));
        }
    }

    @GetMapping("/trazQuartosPousadaLogada")
    public ResponseEntity<?> trazQuartosPousadaLogada(@AuthenticationPrincipal UsuarioPrincipalDto usuarioPrincipalDto){
        try{
            QuartosResponseDto response = quartoService.trazQuartosPousadaLogada(usuarioPrincipalDto);
            return ResponseEntity.ok(Map.of("success", true, "mensagem", "Quartos retornados com sucesso!", "data", response));
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("success", false, "mensagem", e.getMessage()));
        }
    }

    @DeleteMapping("/deletarQuarto/{id_quarto}")
    public ResponseEntity<?> trazQuartosPousadaLogada(@PathVariable Long id_quarto){
        try{
            quartoService.deletarQuarto(id_quarto);
            return ResponseEntity.ok(Map.of("success", true, "mensagem", "Quarto deletado com sucesso!"));
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("success", false, "mensagem", e.getMessage()));
        }
    }

}
