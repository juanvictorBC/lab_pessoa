package com.lptec.labpessoa.domain;

public class Pessoa {
	
	private Long id;
	private String nome;
	private String sobreNome;
	private String genero;
	private String telefone;
	
	public Pessoa() {
	}

	public Pessoa(Long id, String nome, String sobreNome, String genero, String telefone) {
		this.id = id;
		this.nome = nome;
		this.sobreNome = sobreNome;
		this.genero = genero;
		this.telefone = telefone;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSobreNome() {
		return sobreNome;
	}

	public void setSobreNome(String sobreNome) {
		this.sobreNome = sobreNome;
	}

	public String getGenero() {
		return genero;
	}

	public void setGenero(String genero) {
		this.genero = genero;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	
}
