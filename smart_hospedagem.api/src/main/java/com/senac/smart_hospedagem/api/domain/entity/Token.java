package com.senac.smart_hospedagem.api.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jdk.jfr.DataAmount;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    public Token(Long id, String token, UsuarioPrincipal usuarioPrincipal){
        this.setId(id);
        this.setToken(token);
        this.setUsuarioPrincipal(usuarioPrincipal);
    }


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuarioPrincipal_id", nullable = true)
    private UsuarioPrincipal usuarioPrincipal;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UsuarioPrincipal getUsuarioPrincipal() {
        return usuarioPrincipal;
    }

    public void setUsuarioPrincipal(UsuarioPrincipal usuarioPrincipal) {
        this.usuarioPrincipal = usuarioPrincipal;
    }
}
