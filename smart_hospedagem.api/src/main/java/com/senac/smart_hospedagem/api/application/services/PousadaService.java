package com.senac.smart_hospedagem.api.application.services;

import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaDetalhesResponseDto;
import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaRequestDto;
import com.senac.smart_hospedagem.api.application.dto.pousada.PousadaResponseDto;
import com.senac.smart_hospedagem.api.application.dto.pousada.PousadasResponseDto;
import com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal.UsuarioPrincipalDto;
import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import com.senac.smart_hospedagem.api.domain.entity.PousadaEtapasConfiguracao;
import com.senac.smart_hospedagem.api.domain.entity.Quarto;
import com.senac.smart_hospedagem.api.domain.entity.UsuarioPrincipal;
import com.senac.smart_hospedagem.api.domain.repository.PousadaRepository;
import com.senac.smart_hospedagem.api.domain.repository.QuartoRepository;
import com.senac.smart_hospedagem.api.domain.repository.UsuarioPrincipalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class PousadaService {

    @Autowired
    private PousadaRepository pousadaRepository;

    @Autowired
    private PousadaEtapasConfiguracaoService pousadaEtapasConfiguracaoService;

    @Autowired
    private GaleriaService galeriaService;

    @Autowired
    private QuartoService quartoService;


    @Autowired
    private UsuarioPrincipalRepository usuarioPrincipalRepository;

    private final String uploadDir = System.getProperty("user.dir") + "/uploads/foto_perfil_pousada";

    public Pousada cadastrar(PousadaRequestDto pousadaRequestDto) throws Exception{
        var response = pousadaRepository.findByCnpj(pousadaRequestDto.cnpj());

        if(response.isPresent()){
            throw new Exception("CNPJ já existente!");
        }
        Pousada persist = new Pousada(pousadaRequestDto);

        List<PousadaEtapasConfiguracao> configuracaos = pousadaEtapasConfiguracaoService.gravarEtapas(persist);
        persist.setEtapas_configuracoes(configuracaos);

        pousadaRepository.save(persist);

        return persist;
    }


    public PousadasResponseDto listarPousadas(){
        List<Pousada> pousadasResponse = pousadaRepository.findAll();

        return new PousadasResponseDto(pousadasResponse);
    }

    public Pousada atualizarDados(UsuarioPrincipal usuarioPrincipal, PousadaRequestDto pousadaRequest) throws Exception{

        Optional<Pousada> existente = pousadaRepository.findByCnpj(pousadaRequest.cnpj());

        if(existente.isPresent() && !existente.get().getCnpj().equals(usuarioPrincipal.getPousada().getCnpj())){
            throw new Exception("CNPJ já existente!");
        }

        Pousada pousadaPersist = usuarioPrincipal.getPousada();

        pousadaPersist.setId(usuarioPrincipal.getPousada().getId());
        pousadaPersist.setCnpj(pousadaRequest.cnpj());
        pousadaPersist.setDescricao(pousadaRequest.descricao());
        pousadaPersist.setBreve_descricao(pousadaRequest.breve_descricao());
        pousadaPersist.setRazao_social(pousadaRequest.razao_social());
        pousadaPersist.setNome_responsavel(pousadaRequest.nome_responsavel());
        pousadaPersist.setNome_fantasia(pousadaRequest.nome_fantasia());
        pousadaPersist.setUsuarioPrincipal(usuarioPrincipal);
        pousadaPersist.setFoto_perfil(pousadaRequest.foto_perfil());

        return pousadaRepository.save(pousadaPersist);
    }


    public boolean validaDadosEstaoCompletoPerfilPousada(Pousada pousada){

        return pousada.getCnpj() != null &&
                pousada.getDescricao() != null &&
                pousada.getBreve_descricao() != null &&
                pousada.getNome_fantasia() != null &&
                pousada.getNome_responsavel() != null &&
                pousada.getRazao_social() != null &&
                pousada.getFoto_perfil() != null;
    }

    public boolean validaQuartosExistentePousada(Pousada pousada){

        long quantidade_quartos = quartoService.trazQuantiadeQuartosPousada(pousada);

        if(quantidade_quartos == 0){
            return false;
        }else{
            return true;
        }
    }

    public boolean validaFotosGaleriaExistentePousada(Pousada pousada){
        long quantidadeFotosGaleria = galeriaService.trazQuantiadeFotosGaleriaPousada(pousada);

        if(quantidadeFotosGaleria == 0){
            return false;
        }else{
            return true;
        }
    }

    public PousadaDetalhesResponseDto trazDetalhesPousada(Long id){
        Pousada pousada = pousadaRepository.findById(id).orElseThrow(() -> new RuntimeException("Pousada não encontrada"));

        return new PousadaDetalhesResponseDto(pousada);
    }

    public String uploadFotoPerfil(UsuarioPrincipalDto usuarioLogado, MultipartFile file) throws Exception{
        Optional<UsuarioPrincipal> usuarioPersist = usuarioPrincipalRepository.findById(usuarioLogado.id());

        String fileName = file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir+fileName);

        Files.createDirectories(filePath.getParent());
        file.transferTo(filePath.toFile());

        Pousada pousada = usuarioPersist.get().getPousada();
        pousada.setFoto_perfil(filePath.toString());

        pousadaRepository.save(pousada);

        return filePath.toString();
    }
}
