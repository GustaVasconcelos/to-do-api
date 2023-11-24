import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import RepositorioUsuario from './external/db/repositorioUsuario';
import Db from './external/db/db';
import SenhaCripto from './external/auth/senhaCripto';
import RegistrarUsuario from './core/usuarios/service/registrarUsuario';
import RegistrarUsuarioController from './external/api/controllers/registrarUsuarioController';
import LoginUsuarioController from './external/api/controllers/loginUsuarioController';
import LoginUsuario from './core/usuarios/service/loginUsuario';
import ValidarUsuario from './external/validations/validarUsuario';


const app = express();
const porta = process.env.API_PORT ?? 4000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(porta, () => {
    console.log('Servidor executando na porta: ' + porta)
});

// ------------------ Rotas abertas
const db = new Db();
const repositorioUsuario = new RepositorioUsuario(db);
const validarUsuario = new ValidarUsuario();
const provedorCripto = new SenhaCripto();

const registrarUsuario = new RegistrarUsuario(
    provedorCripto,
    repositorioUsuario,
    validarUsuario
)

const loginUsuario = new LoginUsuario(
    provedorCripto,
    repositorioUsuario,
    validarUsuario,
)

new RegistrarUsuarioController(app, registrarUsuario);
new LoginUsuarioController(app, loginUsuario);