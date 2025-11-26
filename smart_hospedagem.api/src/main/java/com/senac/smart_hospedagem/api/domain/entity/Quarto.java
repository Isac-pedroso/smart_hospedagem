package com.senac.smart_hospedagem.api.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.senac.smart_hospedagem.api.application.dto.quarto.QuartoRequestDto;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Quarto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    @Column(nullable = false)
    private double vl_por_pessoa;

    @Column(nullable = false)
    private double desconto;

    @Column(nullable = false)
    private int capacidade;

    @ManyToOne
    @JoinColumn(name = "status_id")
    private Status_quarto status;

    @ManyToOne
    @JoinColumn(name = "pousada_id")
    @JsonIgnore
    private Pousada pousada;

    @OneToMany(mappedBy = "quarto", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<FotosQuarto> fotosQuarto;

    public Quarto(){}

    public Quarto(QuartoRequestDto requestDto){
        this.id = requestDto.id();
        this.nome = requestDto.nome();;
        this.descricao = requestDto.descricao();
        this.desconto = requestDto.desconto();
        this.vl_por_pessoa = requestDto.vl_por_pessoa();
        this.capacidade = requestDto.capacidade();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getVl_por_pessoa() {
        return vl_por_pessoa;
    }

    public void setVl_por_pessoa(double vl_por_pessoa) {
        this.vl_por_pessoa = vl_por_pessoa;
    }

    public double getDesconto() {
        return desconto;
    }

    public void setDesconto(double desconto) {
        this.desconto = desconto;
    }

    public int getCapacidade() {
        return capacidade;
    }

    public void setCapacidade(int capacidade) {
        this.capacidade = capacidade;
    }

    public Status_quarto getStatus() {
        return status;
    }

    public void setStatus(Status_quarto status) {
        this.status = status;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
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
