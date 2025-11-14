package com.senac.smart_hospedagem.api.application.services;

import com.senac.smart_hospedagem.api.application.dto.loginUsuario.LoginUsuarioRequestDto;
import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaRequestDto;
import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaResponseDto;
import com.senac.smart_hospedagem.api.application.dto.pousadaEtapasConfiguracao.PousadaEtapasConfiguracaoResponseDto;
import com.senac.smart_hospedagem.api.application.dto.usuario.UsuarioRequestDto;
import com.senac.smart_hospedagem.api.application.dto.usuario.UsuarioResponseDto;
import com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal.*;
import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import com.senac.smart_hospedagem.api.domain.entity.PousadaEtapasConfiguracao;
import com.senac.smart_hospedagem.api.domain.entity.Usuario;
import com.senac.smart_hospedagem.api.domain.entity.UsuarioPrincipal;
import com.senac.smart_hospedagem.api.domain.repository.UsuarioPrincipalRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioPrincipalService {
    @Autowired
    private UsuarioPrincipalRepository usuarioPrincipalRepository;

    public boolean validarSenha(LoginUsuarioRequestDto login){
        return usuarioPrincipalRepository.existsByEmailContainingAndSenha(login.email(), login.senha());
    }


    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PousadaService pousadaService;

    @Autowired
    private PousadaEtapasConfiguracaoService pousadaEtapasConfiguracaoService;

    @Transactional
    public UsuarioPrincipalResponseDto cadastrar(UsuarioPrincipalRequestDto usuarioPrincipalRequestDto, UsuarioRequestDto usuarioRequestDto, PousadaRequestDto pousadaRequestDto) throws Exception{

        Optional<UsuarioPrincipal> response = usuarioPrincipalRepository.findByEmail(usuarioPrincipalRequestDto.email());

        if(response.isPresent()){
            throw new Exception("Usuario já existente!");
        }

        // Faz o cadastro dos dados do UsuarioPrincipal
        UsuarioPrincipal usuarioPrincipal = new UsuarioPrincipal(usuarioPrincipalRequestDto);

        switch (usuarioPrincipalRequestDto.tipo_cadastro()){
            case 1:
                // Cadastra usuario normal
                Usuario usuarioResponse = usuarioService.cadastrar(usuarioRequestDto);
                usuarioPrincipal.setUsuario(usuarioResponse);
                usuarioPrincipal.setRole("ROLE_USER");
                break;
            case 2:
                // Cadastra usuario empresa
                Pousada pousadaResponse = pousadaService.cadastrar(pousadaRequestDto);
                usuarioPrincipal.setPousada(pousadaResponse);
                usuarioPrincipal.setRole("ROLE_POUSADA");
                break;
            default:
                throw  new Exception("Nenhum tipo de cadastro selecionado!");
        }
        usuarioPrincipal.setCadastro_concluido(false);

        usuarioPrincipalRepository.save(usuarioPrincipal);

        return new UsuarioPrincipalResponseDto(usuarioPrincipal);
    }


    public UsuarioPrincipalSimplificadoResponseDto getDadosUsuarioPrincipal(UsuarioPrincipalDto usuarioLogado) throws Exception{

        Optional<UsuarioPrincipal> response = usuarioPrincipalRepository.findByIdUserCompleto(usuarioLogado.id());

        if(!response.isPresent()){
            throw new Exception("Usuario não encontrado!");
        }

        String email = response.get().getEmail();
        String nome = response.get().getUsuario() != null ? response.get().getUsuario().getNome() : response.get().getPousada().getNome_fantasia();
        String role = response.get().getRole();
        boolean cadastro_concluido = response.get().isCadastro_concluido();

        return new UsuarioPrincipalSimplificadoResponseDto(email, nome, role, cadastro_concluido);
    }


    public UsuarioPrincipalFullResponseDto getDadosFullUsuario(UsuarioPrincipalDto usuarioLogado) throws Exception{

        Optional<UsuarioPrincipal> response = usuarioPrincipalRepository.findByIdUserCompleto(usuarioLogado.id());

        if(!response.isPresent()){
            throw new Exception("Usuario não encontrado!");
        }

        return new UsuarioPrincipalFullResponseDto(response.get().getUsuario(), response.get().getPousada());
    }

    @Transactional
    public boolean atualizarDados(UsuarioRequestDto usuarioRequest,PousadaRequestDto pousadaRequest, UsuarioPrincipalDto usuarioPrincipal) throws Exception{
        // Aqui abordei o throw com orElseThrow
        UsuarioPrincipal usuarioPersist = usuarioPrincipalRepository.findById(usuarioPrincipal.id()).orElseThrow(() -> new RuntimeException("Usuario não encontrado!"));

        if(usuarioRequest != null){
            usuarioService.atualizarDados(usuarioPersist,usuarioRequest);
        }

        if(pousadaRequest != null){
            pousadaService.atualizarDados(usuarioPersist, pousadaRequest);
        }

        return true;
    }

    public List<PousadaEtapasConfiguracaoResponseDto> validaEtapasConfiguracao(UsuarioPrincipalDto usuarioPrincipal) throws Exception{

        Optional<UsuarioPrincipal> usuarioPersist = usuarioPrincipalRepository.findById(usuarioPrincipal.id());

        if(!usuarioPersist.isPresent()){
            throw new Exception("Usuario não encontrado!");
        }

        if(!pousadaService.validaDadosEstaoCompletoPerfilPousada(usuarioPersist.get().getPousada())){
            pousadaEtapasConfiguracaoService.editarEtapaParaFalse(usuarioPersist.get().getPousada(), "dados_perfil");
        }else{
            pousadaEtapasConfiguracaoService.editarEtapaParaTrue(usuarioPersist.get().getPousada(), "dados_perfil");
        }

        if(!pousadaService.validaQuartosExistentePousada(usuarioPersist.get().getPousada())){
            pousadaEtapasConfiguracaoService.editarEtapaParaFalse(usuarioPersist.get().getPousada(), "quartos");
        }else{
            pousadaEtapasConfiguracaoService.editarEtapaParaTrue(usuarioPersist.get().getPousada(), "quartos");
        }

        if(!pousadaService.validaFotosGaleriaExistentePousada(usuarioPersist.get().getPousada())){
            pousadaEtapasConfiguracaoService.editarEtapaParaFalse(usuarioPersist.get().getPousada(), "galeria");
        }else{
            pousadaEtapasConfiguracaoService.editarEtapaParaTrue(usuarioPersist.get().getPousada(), "galeria");
        }

        return pousadaEtapasConfiguracaoService.trasEtapasConfiguracoes(usuarioPersist.get().getPousada());
    }
}
