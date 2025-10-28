package com.senac.smart_hospedagem.api.presetation;

import com.senac.smart_hospedagem.api.application.dto.login.AuthUserDto;
import com.senac.smart_hospedagem.api.application.dto.login.LoginRequestDto;
import com.senac.smart_hospedagem.api.domain.entity.Usuario;
import com.senac.smart_hospedagem.api.application.services.TokenService;
import com.senac.smart_hospedagem.api.application.services.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/auth")
@Tag(name = "Autenticação controller", description = "Sei la")
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
        Usuario usuario = usuarioService.buscarPorEmail(request.email());
        var role = usuario.getRole();

        var token = tokenService.gerarToken(request.usuario(), request.senha(), role, request.email());

        return ResponseEntity.ok(Map.of("token", token));
    }

    @GetMapping("/usuarioAutenticado")
    public ResponseEntity<AuthUserDto> getUsuarioAutenticado(Authentication authentication){
        try{
            String email = authentication.getName();
            System.out.println(email);
            Usuario usuario = usuarioService.buscarPorEmail(email);
            AuthUserDto novoUsuario = new AuthUserDto(usuario);
            return ResponseEntity.ok(novoUsuario);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

}
