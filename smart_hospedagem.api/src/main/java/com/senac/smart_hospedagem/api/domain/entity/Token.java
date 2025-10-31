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


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuarioPrincipal_id", nullable = true)
    private UsuarioPrincipal usuarioPrincipal;

}
