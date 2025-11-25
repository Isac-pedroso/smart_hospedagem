package com.senac.smart_hospedagem.api.presetation;

import com.senac.smart_hospedagem.api.application.dto.quarto.QuartoRequestDto;
import com.senac.smart_hospedagem.api.application.services.QuartoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/quarto")
public class QuartoController {
    @Autowired
    private QuartoService quartoService;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody QuartoRequestDto request){
        try{
            var quartoRespoonse = quartoService.cadastrar(request);
            return ResponseEntity.ok(Map.of("success", true, "message", "Cadastro realizado com sucesso!", "data", quartoRespoonse));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("success", false, "mensagem", e.getMessage()));
        }
    }
}
