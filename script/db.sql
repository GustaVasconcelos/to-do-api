create extension if not exists "uuid-ossp";

CREATE TABLE usuarios (
    id uuid PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
);

CREATE TABLE tarefas (
    id UUID PRIMARY KEY,
    id_usuario UUID REFERENCES usuarios(id) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    prioridade VARCHAR(20),
    status_conclusao BOOLEAN DEFAULT false
);