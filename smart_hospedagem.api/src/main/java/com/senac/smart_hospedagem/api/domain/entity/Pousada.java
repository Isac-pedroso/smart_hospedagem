package com.senac.smart_hospedagem.api.domain.entity;

import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaRequestDto;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Pousada {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "pousada")
    private UsuarioPrincipal usuarioPrincipal;

    @Column(nullable = false)
    private String cnpj;
    private String nome_fantasia;
    private String razao_social;
    private String nome_responsavel;


    public Pousada(PousadaRequestDto requestDto){
        this.setId(requestDto.id());
        this.setNome_fantasia(requestDto.nome_fantasia());
        this.setNome_responsavel(requestDto.nome_responsavel());
        this.setRazao_social(requestDto.razao_social());
        this.setUsuarioPrincipal(requestDto.usuarioPrincipal());
        this.setCnpj(requestDto.cnpj());
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
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

    public String getNome_fantasia() {
        return nome_fantasia;
    }

    public void setNome_fantasia(String nome_fantasia) {
        this.nome_fantasia = nome_fantasia;
    }

    public String getRazao_social() {
        return razao_social;
    }

    public void setRazao_social(String razao_social) {
        this.razao_social = razao_social;
    }

    public String getNome_responsavel() {
        return nome_responsavel;
    }

    public void setNome_responsavel(String nome_responsavel) {
        this.nome_responsavel = nome_responsavel;
    }
}
