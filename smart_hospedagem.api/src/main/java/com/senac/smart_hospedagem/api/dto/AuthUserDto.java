package com.senac.smart_hospedagem.api.dto;

import com.senac.smart_hospedagem.api.entity.Usuario;

public class AuthUserDto {
    private Long id;
    private String nome;
    private String email;
    private String role;

    public AuthUserDto(Usuario usuario){
        this.id = usuario.getId();
        this.nome = usuario.getUsuario();
        this.email = usuario.getEmail();
        this.role = usuario.getRole();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
