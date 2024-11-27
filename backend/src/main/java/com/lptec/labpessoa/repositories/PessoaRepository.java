package com.lptec.labpessoa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lptec.labpessoa.domain.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {

}
