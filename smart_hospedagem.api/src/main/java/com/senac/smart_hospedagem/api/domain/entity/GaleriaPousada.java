package com.senac.smart_hospedagem.api.domain.entity;

import jakarta.persistence.*;

@Entity
public class GaleriaPousada {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "pousada_id")
    private Pousada pousada;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Pousada getPousada() {
        return pousada;
    }

    public void setPousada(Pousada pousada) {
        this.pousada = pousada;
    }
}
