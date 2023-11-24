"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const repositorioUsuario_1 = __importDefault(require("./external/db/repositorioUsuario"));
const db_1 = __importDefault(require("./external/db/db"));
const senhaCripto_1 = __importDefault(require("./external/auth/senhaCripto"));
const registrarUsuario_1 = __importDefault(require("./core/usuarios/service/registrarUsuario"));
const registrarUsuarioController_1 = __importDefault(require("./external/api/controllers/registrarUsuarioController"));
const loginUsuarioController_1 = __importDefault(require("./external/api/controllers/loginUsuarioController"));
const loginUsuario_1 = __importDefault(require("./core/usuarios/service/loginUsuario"));
const validarUsuario_1 = __importDefault(require("./external/validations/validarUsuario"));
const app = (0, express_1.default)();
const porta = (_a = process.env.API_PORT) !== null && _a !== void 0 ? _a : 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(porta, () => {
    console.log('Servidor executando na porta: ' + porta);
});
// ------------------ Rotas abertas
const db = new db_1.default();
const repositorioUsuario = new repositorioUsuario_1.default(db);
const validarUsuario = new validarUsuario_1.default();
const provedorCripto = new senhaCripto_1.default();
const registrarUsuario = new registrarUsuario_1.default(provedorCripto, repositorioUsuario, validarUsuario);
const loginUsuario = new loginUsuario_1.default(provedorCripto, repositorioUsuario, validarUsuario);
new registrarUsuarioController_1.default(app, registrarUsuario);
new loginUsuarioController_1.default(app, loginUsuario);
