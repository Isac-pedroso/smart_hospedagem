package com.senac.smart_hospedagem.api.presetation;

import com.senac.smart_hospedagem.api.application.dto.galeria.GaleriaDto;
import com.senac.smart_hospedagem.api.domain.entity.Galeria;
import com.senac.smart_hospedagem.api.application.services.GaleriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
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
            List<GaleriaDto> galerias = galeriaService.listarPorUsuario(id);
            return ResponseEntity.ok(galerias);
        }catch(Exception e){
            e.printStackTrace();
            Map<String, String> response = new HashMap<>();
            response.put("erro","Erro: "+e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }


    @GetMapping("/listar")
    public ResponseEntity<?> listar(){
        try{
            List<GaleriaDto> galerias = galeriaService.listar();
            return ResponseEntity.ok(galerias);
        }catch(Exception e){
            e.printStackTrace();
            Map<String, String> response = new HashMap<>();
            response.put("erro","Erro: "+e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }


}
