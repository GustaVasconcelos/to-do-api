"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const erros_1 = __importDefault(require("../../shared/erros"));
class LoginUsuario {
    constructor(provedorDeCriptografia, repositorio, validarEntrada) {
        this.provedorDeCriptografia = provedorDeCriptografia;
        this.repositorio = repositorio;
        this.validarEntrada = validarEntrada;
    }
    executar(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            this.camposVazios(usuario);
            this.validarEmail(usuario.email);
            const usuarioExistente = yield this.verificarUsuario(usuario.email);
            this.compararSenhas(usuario.senha, usuarioExistente.senha);
            return Object.assign(Object.assign({}, usuarioExistente), { senha: undefined });
        });
    }
    camposVazios(entrada) {
        const camposVazios = this.validarEntrada.verificarCamposVazios(entrada);
        if (camposVazios)
            throw new Error(erros_1.default.CAMPOS_OBRIGATORIOS);
    }
    compararSenhas(senha, senhaBancoDeDados) {
        const compararSenhas = this.provedorDeCriptografia.comparar(senha, senhaBancoDeDados);
        if (!compararSenhas)
            throw new Error(erros_1.default.SENHA_INCORRETA);
    }
    validarEmail(email) {
        const emailValido = this.validarEntrada.validarEmail(email);
        if (!emailValido)
            throw new Error(erros_1.default.EMAIL_INVALIDO);
    }
    verificarUsuario(email) {
        const usuario = this.repositorio.buscarPorEmail(email);
        if (!usuario)
            throw new Error(erros_1.default.USUARIO_INEXISTENTE);
        return usuario;
    }
}
exports.default = LoginUsuario;
