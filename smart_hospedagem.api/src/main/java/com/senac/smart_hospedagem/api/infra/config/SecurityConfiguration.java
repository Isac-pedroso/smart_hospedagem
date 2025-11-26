package com.senac.smart_hospedagem.api.infra.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        // IGNORAR totalmente o pipeline de segurança para /uploads/**
        return (web) -> web.ignoring().requestMatchers("/uploads/**");
    }

    @Bean
    public SecurityFilterChain filterChain (HttpSecurity http) throws Exception{
        return http.cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests( auth ->
                        auth
                                .requestMatchers("/auth/login").permitAll()
                                .requestMatchers("/auth/usuarioAutenticado").authenticated()
                                .requestMatchers(HttpMethod.POST, "/usuarioPrincipal/cadastrar").permitAll()
                                .requestMatchers(HttpMethod.GET, "/usuarioPrincipal/getDadosFullUsuario").authenticated()
                                .requestMatchers(HttpMethod.PUT, "/usuarioPrincipal/atualizarDados").authenticated()
                                .requestMatchers(HttpMethod.PUT, "/usuarioPrincipal/validaEtapasConfiguracao").authenticated()
                                .requestMatchers(HttpMethod.GET, "/pousada/listarPousadas").permitAll()
                                .requestMatchers(HttpMethod.POST, "/quarto/cadastrar").authenticated()
                                .requestMatchers(HttpMethod.GET, "/quarto/trazQuartosPousadaLogada").authenticated()
                                .requestMatchers(HttpMethod.GET, "/pousada/trazDetalhesPousada/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/fotosQuarto/upload/**").authenticated()
                                .requestMatchers(HttpMethod.GET, "/fotosQuarto/trazFotosQuarto/**").authenticated()
                                .requestMatchers("/uploads/**").permitAll()
                                .requestMatchers("/swagger-resources/**").permitAll()
                                .requestMatchers("/v3/api-docs/**").permitAll()
                                .requestMatchers("/swagger-ui/**").permitAll()
                                .requestMatchers("/usuarios").hasRole("ADMIN")
                                .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
