package com.senac.smart_hospedagem.api.presetation;

import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaDetalhesResponseDto;
import com.senac.smart_hospedagem.api.application.dto.pousada.PousadasResponseDto;
import com.senac.smart_hospedagem.api.application.services.PousadaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
