package com.senac.smart_hospedagem.api.domain.entity;

import com.senac.smart_hospedagem.api.application.dto.usuario.UsuarioRequestDto;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "usuario")
    private UsuarioPrincipal usuarioPrincipal;

    @Column(nullable = false)
    private String nome;
    private String cpf;
    private Date dt_nascimento;

    public Usuario(UsuarioRequestDto usuarioRequestDto){
        this.id = usuarioRequestDto.id();
        this.nome = usuarioRequestDto.nome();
        this.cpf = usuarioRequestDto.cpf();
        this.dt_nascimento = usuarioRequestDto.dt_nascimento();
        this.usuarioPrincipal = usuarioRequestDto.usuarioPrincipal();
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UsuarioPrincipal getUsuarioPrincipal() {
        return usuarioPrincipal;
    }

    public void setUsuarioPrincipal(UsuarioPrincipal usuarioPrincipal) {
        this.usuarioPrincipal = usuarioPrincipal;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Date getDt_nascimento() {
        return dt_nascimento;
    }

    public void setDt_nascimento(Date dt_nascimento) {
        this.dt_nascimento = dt_nascimento;
    }
}
