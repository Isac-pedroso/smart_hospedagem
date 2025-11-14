package com.senac.smart_hospedagem.api.domain.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class PousadaEtapasConfiguracao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pousada_id")
    private Pousada pousada;

    @Column(nullable = false)
    private String etapa;
    private boolean concluido;
    private LocalDateTime atualizado_em = LocalDateTime.now();

    public PousadaEtapasConfiguracao(){}
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Pousada getPousada() {
        return pousada;
    }

    public void setPousada(Pousada pousada) {
        this.pousada = pousada;
    }

    public String getEtapa() {
        return etapa;
    }

    public void setEtapa(String etapa) {
        this.etapa = etapa;
    }

    public boolean isConcluido() {
        return concluido;
    }

    public void setConcluido(boolean concluido) {
        this.concluido = concluido;
    }

    public LocalDateTime getAtualizado_em() {
        return atualizado_em;
    }

    public void setAtualizado_em(LocalDateTime atualizado_em) {
        this.atualizado_em = atualizado_em;
    }
}
