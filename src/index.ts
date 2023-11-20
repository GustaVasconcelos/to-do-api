import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import RepositorioUsuario from './external/db/repositorioUsuario';
import Db from './external/db/db';
import SenhaCripto from './external/auth/senhaCripto';
import RegistrarUsuario from './core/usuarios/service/registrarUsuario';
import RegistrarUsuarioController from './external/api/registrarUsuarioController';
import ValidarUsuario from './external/validations/validarUsuario';

const app = express();
const porta = process.env.API_PORT ?? 4000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(porta, () => {
    console.log('Servidor executando na porta: ' + porta)
});

// ------------------ Rotas abertas
const db = new Db();
const repositorioUsuario = new RepositorioUsuario(db);
const provedorCripto = new SenhaCripto();
const validarUsuario = new ValidarUsuario();

const registrarUsuario = new RegistrarUsuario(
    provedorCripto,
    repositorioUsuario,
    validarUsuario
)

new RegistrarUsuarioController(app, registrarUsuario);