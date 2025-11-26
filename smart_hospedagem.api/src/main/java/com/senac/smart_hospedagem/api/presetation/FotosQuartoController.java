package com.senac.smart_hospedagem.api.presetation;

import com.senac.smart_hospedagem.api.application.dto.FotosQuartoResponseDto;
import com.senac.smart_hospedagem.api.application.dto.pousada.PousadasResponseDto;
import com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal.UsuarioPrincipalDto;
import com.senac.smart_hospedagem.api.application.services.FotosQuartoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/fotosQuarto")
public class FotosQuartoController {


    @Autowired
    private FotosQuartoService fotosQuartoService;

    @PostMapping("/upload/{id_quarto}")
    public ResponseEntity<?> uploadFoto(@PathVariable Long id_quarto, @RequestParam("file") MultipartFile file){
        try{
            var resultUpload = fotosQuartoService.uploadFoto(id_quarto, file);
            return ResponseEntity.ok(Map.of("success", true, "message", "Foto cadastrada com sucesso!", "data", resultUpload));
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @GetMapping("/trazFotosQuarto/{id_quarto}")
    public ResponseEntity<?> trazFotosQuarto(@PathVariable Long id_quarto){
        try{
            FotosQuartoResponseDto fotos = fotosQuartoService.trazFotosQuarto(id_quarto);
            return ResponseEntity.ok(Map.of("success", true, "message", "Fotos retornadas com sucesso!", "data", fotos));
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }


    @DeleteMapping("/excluirFoto/{id_foto}")
    public ResponseEntity<?> excluirFoto(@PathVariable Long id_foto){
        try{
            fotosQuartoService.excluirFoto(id_foto);
            return ResponseEntity.ok(Map.of("success", true, "message", "Foto excluida com sucesso"));
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }
}
