# Soccer Leaderboard

Boas-vindas ao repositório Soccer Leaderboard

Este repositorio apresenta uma API RESTful para gestão de uma tabela de campeonato de futebol é projetada para gerenciar partidas de futebol, fornecendo operações de CRUD (Create, Read, Update, Delete). Esta API permite criar partidas, atualizar os detalhes das partidas, finalizar partidas e visualizar as informações das partidas. Além disso, a API implementa autenticação e autorização para garantir que apenas usuários autorizados possam acessar e modificar os dados.

## Tecnologias e Ferramentas Utilizadas

### Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/4x/api.html)
- [MySQL](https://www.npmjs.com/package/mysql2)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)
- [React](https://react.dev/)

### Ferramentas

- [VSCode](https://code.visualstudio.com/)
- [Docker](https://docs.docker.com/reference/)
- [Sequelize](https://sequelize.org/docs/v6/getting-started/)
- [Insomnia](https://insomnia.rest/)
- [Swagger](https://swagger.io/specification/)

## Como executar o Projeto

### Instalação e Execução

1. Clone o repositório (Utilizar Link SSH)

2. Inicializar projeto
```sh
  npm install
```
3. Rodar os containers Docker
```sh
  npm run compose:up
```
>Nota: Por padrão o Front-end estará rodando na porta 3000, o Back-end na porta 3001 e o Banco de Dados na porta 3306.

4. Parar os containers Docker
```sh
  npm run compose:down
```

## Documentação

A documentação da API é gerada automaticamente através
do [Swagger](https://swagger.io/specification/) e estará disponível através do
endpoint http://localhost:3001/api-docs/
quando a aplicação estiver em execução. A documentação inclui detalhes sobre os endpoints disponíveis, os parâmetros necessários, os códigos de resposta e exemplos de solicitações.

### Realização de Requisições

Este arquivo contém uma coleção de endpoints para a plataforma Insomnia, que podem ser importados
diretamente para a aplicação, simplificando o processo de teste e interação com a API.

- [Insomnia_leaderBoard.json](./Insomnia_leaderboard.json)


## Contribuições

[Yago Moreira](https://www.linkedin.com/in/yagobmoreira/)

[Trybe](https://www.betrybe.com/)
