package br.edu.ifg.academico.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.edu.ifg.academico.entities.Aluno;
import br.edu.ifg.academico.repositories.AlunoRepository;
import br.edu.ifg.academico.services.exceptions.ResourceNotFoundException;

@Service
public class AlunoService {

    private final AlunoRepository alunoRepository;

    public AlunoService(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    public List<Aluno> findAll() {
        return alunoRepository.findAll();
    }

    public Aluno findById(Integer id) {
        return alunoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado. Id: " + id));
    }

    public Aluno insert(Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    public Aluno update(Integer id, Aluno alunoAtualizado) {
        Aluno aluno = findById(id);

        aluno.setNome(alunoAtualizado.getNome());
        aluno.setSexo(alunoAtualizado.getSexo());
        aluno.setDt_nasc(alunoAtualizado.getDt_nasc());

        return alunoRepository.save(aluno);
    }

    public void delete(Integer id) {
        Aluno aluno = findById(id);
        alunoRepository.delete(aluno);
    }
}
