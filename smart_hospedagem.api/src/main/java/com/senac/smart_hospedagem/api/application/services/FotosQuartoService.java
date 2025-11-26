package com.senac.smart_hospedagem.api.application.services;

import com.senac.smart_hospedagem.api.application.dto.FotosQuartoResponseDto;
import com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal.UsuarioPrincipalDto;
import com.senac.smart_hospedagem.api.domain.entity.FotosQuarto;
import com.senac.smart_hospedagem.api.domain.entity.Quarto;
import com.senac.smart_hospedagem.api.domain.entity.UsuarioPrincipal;
import com.senac.smart_hospedagem.api.domain.repository.FotosQuartoRespository;
import com.senac.smart_hospedagem.api.domain.repository.QuartoRepository;
import com.senac.smart_hospedagem.api.domain.repository.UsuarioPrincipalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;


@Service
public class FotosQuartoService {

    @Autowired
    private UsuarioPrincipalRepository usuarioPrincipalRepository;

    @Autowired
    private FotosQuartoRespository fotosQuartoRespository;

    @Autowired
    private QuartoRepository quartoRepository;

    private final String uploadDir = System.getProperty("user.dir") + "/uploads/";

    public boolean uploadFoto(Long id_quarto, MultipartFile file) throws Exception{

        Quarto quarto = quartoRepository.findById(id_quarto).orElseThrow(() -> new RuntimeException("Quarto não encontrado!"));

        String fileName = file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir+fileName);

        Files.createDirectories(filePath.getParent());

        file.transferTo(filePath.toFile());

        FotosQuarto fotoQuarto = new FotosQuarto();
        fotoQuarto.setCaminhoFoto(filePath.toString());
        fotoQuarto.setQuarto(quarto);
        fotoQuarto.setId(null);

        fotosQuartoRespository.save(fotoQuarto);

        return true;
    }



    public FotosQuartoResponseDto trazFotosQuarto(Long id_quarto){
        Quarto quarto = quartoRepository.findById(id_quarto).orElseThrow(() -> new RuntimeException("Quarto não encontrado!"));

        List<FotosQuarto> fotos = fotosQuartoRespository.findByQuartoId(id_quarto);

        return new FotosQuartoResponseDto(fotos);
    }

    public void excluirFoto(Long id_foto){
        fotosQuartoRespository.deleteById(id_foto);
        return;
    }
}
