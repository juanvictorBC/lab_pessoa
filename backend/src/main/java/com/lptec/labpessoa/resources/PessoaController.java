package com.lptec.labpessoa.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lptec.labpessoa.domain.Pessoa;
import com.lptec.labpessoa.services.PessoaService;

@RestController
@RequestMapping("api/pessoas")
@CrossOrigin(origins = "*") //Permitir requisições de qualquer origem
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    @GetMapping
    public List<Pessoa> listarTodas(){
    	return pessoaService.listarTodas();
    }
    public Pessoa buscarPorId(@PathVariable Long id) {
    	return pessoaService.buscarPorId(id).orElse(null);
    }
  
}
