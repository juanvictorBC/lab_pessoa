# lab_pessoa

Um projeto de estudo em Java Spring Boot para gerenciar entidades do tipo Pessoa.

## Tecnologias Utilizadas

- Java 17
- Spring Boot
- JPA/Hibernate
- Banco de Dados (PostgreSQL)
- Maven

## Funcionalidades

- Criar, ler, atualizar e deletar (CRUD) registros de Pessoa
- Exposição de endpoints REST
- Integração com banco de dados

## Como Executar o Projeto

1. Clone o repositório:
   ```sh
   git clone https://github.com/juanvictorBC/lab_pessoa.git
   ```
2. Acesse o diretório do projeto:
   ```sh
   cd lab_pessoa
   ```
3. Configure o banco de dados no `application.properties` ou `application.yml`.
4. Execute o projeto via Maven:
   ```sh
   mvn spring-boot:run
   ```

## Endpoints Disponíveis

| Método | Endpoint      | Descrição |
|--------|--------------|------------|
| GET    | /pessoas     | Lista todas as pessoas |
| GET    | /pessoas/{id} | Busca uma pessoa por ID |
| POST   | /pessoas     | Cadastra uma nova pessoa |
| PUT    | /pessoas/{id} | Atualiza uma pessoa |
| DELETE | /pessoas/{id} | Remove uma pessoa |

## Autor

[Juan Victor](https://github.com/juanvictorBC)

## Licença

Este projeto é distribuído sob a licença MIT.


