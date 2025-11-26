package com.senac.smart_hospedagem.api.application.services;

import com.senac.smart_hospedagem.api.application.dto.quarto.QuartoRequestDto;
import com.senac.smart_hospedagem.api.application.dto.quarto.QuartoResponseDto;
import com.senac.smart_hospedagem.api.application.dto.quarto.QuartosResponseDto;
import com.senac.smart_hospedagem.api.application.dto.usuarioPrincipal.UsuarioPrincipalDto;
import com.senac.smart_hospedagem.api.domain.entity.Pousada;
import com.senac.smart_hospedagem.api.domain.entity.Quarto;
import com.senac.smart_hospedagem.api.domain.entity.Status_quarto;
import com.senac.smart_hospedagem.api.domain.entity.UsuarioPrincipal;
import com.senac.smart_hospedagem.api.domain.repository.PousadaRepository;
import com.senac.smart_hospedagem.api.domain.repository.QuartoRepository;
import com.senac.smart_hospedagem.api.domain.repository.StatusQuartoRepository;
import com.senac.smart_hospedagem.api.domain.repository.UsuarioPrincipalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuartoService {

    @Autowired
    private QuartoRepository quartoRepository;

    @Autowired
    private StatusQuartoRepository statusQuartoRepository;

    @Autowired
    private PousadaRepository pousadaRepository;

    @Autowired
    private UsuarioPrincipalRepository usuarioPrincipalRepository;

    public long trazQuantiadeQuartosPousada(Pousada pousada){
        long quantidade = quartoRepository.countByPousadaId(pousada.getId());

        return quantidade;
    }


    public QuartoResponseDto cadastrar(UsuarioPrincipalDto usuarioLogado, QuartoRequestDto request) throws Exception{
        Quarto quarto = new Quarto(request);

        Optional<Status_quarto> status = statusQuartoRepository.findById(request.status_id());
        Optional<UsuarioPrincipal> usuarioPersist = usuarioPrincipalRepository.findById(usuarioLogado.id());

        if(!usuarioPersist.isPresent()){
            throw new Exception("Usuario não encontrado!");
        }

        quarto.setStatus(status.get());
        quarto.setPousada(usuarioPersist.get().getPousada());

        quarto.setId(null);

        quartoRepository.save(quarto);

        return new QuartoResponseDto(quarto);
    }

    public QuartosResponseDto trazQuartosPousadaLogada(UsuarioPrincipalDto usuarioLogado) throws Exception{
        Optional<UsuarioPrincipal> usuarioPersist = usuarioPrincipalRepository.findById(usuarioLogado.id());

        if(!usuarioPersist.isPresent()){
            throw new Exception("Usuario não encontrado!");
        }

        List<Quarto> quartos = quartoRepository.findByPousadaId(usuarioPersist.get().getPousada().getId());
        List<QuartoResponseDto> quartoDtos = quartos.stream()
                .map(QuartoResponseDto::new)
                .toList();

        return new QuartosResponseDto(quartoDtos);
    }
}
