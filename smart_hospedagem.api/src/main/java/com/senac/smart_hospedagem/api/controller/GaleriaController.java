package com.senac.smart_hospedagem.api.controller;

import com.senac.smart_hospedagem.api.dto.GaleriaDto;
import com.senac.smart_hospedagem.api.entity.Galeria;
import com.senac.smart_hospedagem.api.services.GaleriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/galeriaAdmin")
public class GaleriaController {
    @Autowired
    GaleriaService galeriaService;

    @PostMapping("/cadastrar")
    public ResponseEntity<Galeria> cadastrarGaleria(@RequestBody GaleriaDto galeria){
        try{

            Galeria response = galeriaService.cadastrar(galeria);
            return ResponseEntity.ok(response);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/listarPorUsuario/{id}")
    public ResponseEntity<?> listarPorUsuario(@PathVariable Long id){
        try{
            return ResponseEntity.ok(galeriaService.listarPorUsuario(id));
        }catch(Exception e){
            e.printStackTrace();
            Map<String, String> response = new HashMap<>();
            response.put("erro","Erro: "+e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
