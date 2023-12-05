# To-Do List API

Bem-vindo ao To-Do List API, um projeto simples de lista de tarefas desenvolvido em Node.js, TypeScript e PostgreSQL, seguindo as práticas de Arquitetura Limpa, Clean Code e uma abordagem Hexagonal. Este projeto visa proporcionar uma base escalável e modular, promovendo a clareza e manutenibilidade do código.

## Configurações Necessárias

Antes de iniciar, certifique-se de configurar as variáveis de ambiente necessárias no arquivo `.env`:

- `API_PORT`: Define a porta na qual a API será executada (ex: `4000`).
- `POSTGRES_URL`: URL de conexão com o PostgreSQL, obtida a partir do serviço de storage da Vercel.
- `JWT_SECRET`: Chave secreta para a geração e verificação de tokens JWT (ex: `710d6f9f299ce95aee54027d3233ecae`).

## Sobre o Projeto

Este é um projeto inicial, desenvolvido com o propósito de aplicar conceitos de arquitetura limpa em uma aplicação Node.js. Embora seja funcional, algumas verificações e validações mais avançadas podem estar ausentes, como o tratamento completo para cenários em que o usuário não fornece todos os campos ao editar uma tarefa.

## Como Iniciar o Projeto

1. Clone o repositório: `git clone https://github.com/seu-usuario/to-do-list.git`
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Execute o projeto: `npm run dev`

## Rotas da API

- `POST /api/usuarios/registrar`: Registra um novo usuário.
- `POST /api/usuarios/login`: Realiza o login do usuário.
- `POST /api/tarefas/registrar`: Registra uma nova tarefa.
- `GET /api/tarefas/:idUsuario`: Obtém a lista de tarefas de um usuário.
- `PUT /api/tarefas/editar/:idTarefa`: Edita uma tarefa existente.
- `DELETE /api/tarefas/deletar/:idTarefa`: Deleta uma tarefa existente.

Lembre-se de ajustar as rotas e o ambiente conforme necessário.

Aproveite explorar e expandir este projeto de acordo com suas necessidades!

