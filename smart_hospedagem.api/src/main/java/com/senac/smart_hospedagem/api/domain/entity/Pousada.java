package com.senac.smart_hospedagem.api.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaRequestDto;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Pousada {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "pousada")
    @JsonIgnore
    private UsuarioPrincipal usuarioPrincipal;

    @Column(nullable = false)
    private String cnpj;
    private String nome_fantasia;
    private String razao_social;
    private String nome_responsavel;

    @Column(nullable = true, columnDefinition = "TEXT")
    private String breve_descricao;
    @Column(nullable = true, columnDefinition = "TEXT")
    private String descricao;

    @Column(nullable = true, columnDefinition = "TEXT")
    private String foto_perfil;

    @OneToMany(mappedBy = "pousada", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<PousadaEtapasConfiguracao> etapas_configuracoes = new ArrayList<>();

    @OneToMany(mappedBy = "pousada", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Quarto> quartos = new ArrayList<>();

    @OneToMany(mappedBy = "pousada", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<GaleriaPousada> galeriaPousada = new ArrayList<>();

    public Pousada(){

    }

    public Pousada(PousadaRequestDto requestDto){
        this.setId(requestDto.id());
        this.setNome_fantasia(requestDto.nome_fantasia());
        this.setNome_responsavel(requestDto.nome_responsavel());
        this.setRazao_social(requestDto.razao_social());
        this.setCnpj(requestDto.cnpj());
        this.setBreve_descricao(requestDto.breve_descricao());
        this.setDescricao(requestDto.descricao());
    }


    public List<Quarto> getQuartos() {
        return quartos;
    }

    public void setQuartos(List<Quarto> quartos) {
        this.quartos = quartos;
    }

    public List<GaleriaPousada> getGaleriaPousada() {
        return galeriaPousada;
    }

    public void setGaleriaPousada(List<GaleriaPousada> galeriaPousada) {
        this.galeriaPousada = galeriaPousada;
    }

    public List<PousadaEtapasConfiguracao> getEtapas_configuracoes() {
        return etapas_configuracoes;
    }

    public void setEtapas_configuracoes(List<PousadaEtapasConfiguracao> etapas_configuracoes) {
        this.etapas_configuracoes = etapas_configuracoes;
    }

    public String getFoto_perfil() {
        return foto_perfil;
    }

    public void setFoto_perfil(String foto_perfil) {
        this.foto_perfil = foto_perfil;
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

    public String getBreve_descricao() {
        return breve_descricao;
    }

    public void setBreve_descricao(String breve_descricao) {
        this.breve_descricao = breve_descricao;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
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
