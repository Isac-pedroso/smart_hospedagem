package com.senac.smart_hospedagem.api.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.senac.smart_hospedagem.api.entity.Token;
import com.senac.smart_hospedagem.api.repository.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {
    @Value("${spring.secretkey}")
    private String secret;

    @Value("${spring.tempo_validacao}")
    private Long tempo_validacao;

    private String emissor = "SMART_HOSPEDAGEM";

    @Autowired
    private TokenRepository tokenRepository;

    public String gerarToken(String usuario, String senha, String role){
        Algorithm algorithm = Algorithm.HMAC256(secret);

        String token = JWT.create()
                .withIssuer(emissor)
                .withSubject(usuario)
                .withClaim("role", role)
                .withExpiresAt(this.gerarDataExpiracao())
                .sign(algorithm);
        tokenRepository.save(new Token(null, token, usuario));

        return token;
    }

    public String validarToken(String token){
        Algorithm algorithm = Algorithm.HMAC256(secret);
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(emissor)
                .build();
        verifier.verify(token);
        var tokenResult = tokenRepository.findByToken(token).orElse(null);

        if(tokenResult == null){
            throw new IllegalArgumentException("Token invalido");
        }

        return tokenResult.getUsuario();
    }

    public Instant gerarDataExpiracao(){
        var dataAtual =  LocalDateTime.now();
        dataAtual = dataAtual.plusMinutes(tempo_validacao);

        return dataAtual.toInstant(ZoneOffset.of("-03:00"));
    }
    
    public String getRolePeloToken(String token){
        Algorithm algorithm = Algorithm.HMAC256(secret);
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(emissor)
                .build();
        DecodedJWT decodedJWT = verifier.verify(token);

        return decodedJWT.getClaim("role").toString();
    }
}
