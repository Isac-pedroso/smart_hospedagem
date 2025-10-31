package com.senac.smart_hospedagem.api.domain.entity;

import com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal.UsuarioPrincipalRequestDto;
import com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal.UsuarioPrincipalResponseDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "usuariosPrincipais")
public class UsuarioPrincipal implements UserDetails {

    public UsuarioPrincipal(UsuarioPrincipalRequestDto usuarioRequest){

        this.setEmail(usuarioRequest.email());
        this.setSenha(usuarioRequest.senha());
        this.setRole(usuarioRequest.role());
        this.setUsuario(usuarioRequest.usuario());
        this.setPousada(usuarioRequest.pousada());

        if(this.getDt_cadastro() == null){
            this.setDt_cadastro(LocalDateTime.now());
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String email;
    private String senha;
    private String role;


    @OneToOne(mappedBy = "usuarioPrincipal")
    private Usuario usuario;

    @OneToOne(mappedBy = "usuarioPrincipal")
    private Pousada pousada;




    private LocalDateTime dt_cadastro;
    private LocalDateTime dt_exclusao;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        if("ROLE_ADMIN".equals(this.role)){
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"),
                    new SimpleGrantedAuthority("ROLE_USER"));
        }else{
            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
        }
    }


    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public UsuarioPrincipalResponseDto toDtoResponse() {
        return new UsuarioPrincipalResponseDto(this);
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Pousada getPousada() {
        return pousada;
    }

    public void setPousada(Pousada pousada) {
        this.pousada = pousada;
    }

    public LocalDateTime getDt_cadastro() {
        return dt_cadastro;
    }

    public void setDt_cadastro(LocalDateTime dt_cadastro) {
        this.dt_cadastro = dt_cadastro;
    }

    public LocalDateTime getDt_exclusao() {
        return dt_exclusao;
    }

    public void setDt_exclusao(LocalDateTime dt_exclusao) {
        this.dt_exclusao = dt_exclusao;
    }


}
