package com.senac.smart_hospedagem.api.application.dto.galeria;

import com.senac.smart_hospedagem.api.domain.entity.Galeria;

public class GaleriaDto {
    public GaleriaDto(){

    }
    private Long id;
    private String titulo;
    private String descricao;
    private String url;
    private Long usuario;

    public GaleriaDto(Galeria galeria){
        this.id = galeria.getId();
        this.titulo = galeria.getTitulo();
        this.descricao = galeria.getDescricao();
        this.url = galeria.getUrl();

        if(galeria.getUsuario() != null){
            this.usuario = galeria.getUsuario().getId();
        }
    }

    public Long getUsuario() {
        return usuario;
    }

    public void setUsuario(Long usuario) {
        this.usuario = usuario;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }


}
