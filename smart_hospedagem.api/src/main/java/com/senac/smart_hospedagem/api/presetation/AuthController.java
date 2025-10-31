package com.senac.smart_hospedagem.api.presetation;

import com.senac.smart_hospedagem.api.application.dto.loginUsuario.LoginUsuarioRequestDto;
import com.senac.smart_hospedagem.api.application.dto.loginUsuario.LoginUsuarioResponseDto;
import com.senac.smart_hospedagem.api.application.services.TokenService;
import com.senac.smart_hospedagem.api.application.services.UsuarioPrincipalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
@Tag(name = "Autenticação controller", description = "Sei la")
public class AuthController {
    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioPrincipalService usuarioService;

    @PostMapping("/login")
    @Operation(summary = "Login", description = "Metodo responsavel por realizar login")
    public ResponseEntity<?> login(@RequestBody LoginUsuarioRequestDto request){
        if(!usuarioService.validarSenha(request)){
            return ResponseEntity.badRequest().body("Usuario ou senha invalidos!");
        }

        var token = tokenService.gerarToken(request);

        return ResponseEntity.ok(new LoginUsuarioResponseDto(token));
    }
}
