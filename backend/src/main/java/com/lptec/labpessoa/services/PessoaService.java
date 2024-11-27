package com.lptec.labpessoa.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lptec.labpessoa.domain.Pessoa;
import com.lptec.labpessoa.repositories.PessoaRepository;

@Service
public class PessoaService {

	private final PessoaRepository pessoaRepository;

	public PessoaService(PessoaRepository pessoaRepository) {
		this.pessoaRepository = pessoaRepository;
	}

	@Autowired
	public List<Pessoa> listarTodas() {
		return pessoaRepository.findAll();
	}

	public Optional<Pessoa> buscarPorId(Long id) {
		return pessoaRepository.findById(id);
	}

	public Pessoa salvar(Pessoa pessoa) {
		return pessoaRepository.save(pessoa);

	}

	public void deletar(Long id) {
		pessoaRepository.deleteById(id);
	}

}
