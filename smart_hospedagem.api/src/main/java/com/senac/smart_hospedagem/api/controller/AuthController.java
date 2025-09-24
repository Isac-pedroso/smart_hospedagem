package com.senac.smart_hospedagem.api.controller;

import com.senac.smart_hospedagem.api.dto.LoginRequestDto;
import com.senac.smart_hospedagem.api.services.TokenService;
import com.senac.smart_hospedagem.api.services.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Tag(name = "Autenticação controller", description = "Sei la")
@CrossOrigin(origins = "http://localhost:5174")
public class AuthController {
    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    @Operation(summary = "Login", description = "Metodo responsavel por realizar login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto request){
        if(!usuarioService.validarSenha(request)){
            return ResponseEntity.badRequest().body("Usuario ou senha invalidos!");
        }

        var token = tokenService.gerarToken(request.email(), request.senha(), request.role());

        return ResponseEntity.ok(token);
    }
}
