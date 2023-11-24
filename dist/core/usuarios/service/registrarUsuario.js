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
const id_1 = __importDefault(require("../../shared/id"));
class RegistrarUsuario {
    constructor(provedorCripto, repositorio, validarEntrada) {
        this.provedorCripto = provedorCripto;
        this.repositorio = repositorio;
        this.validarEntrada = validarEntrada;
    }
    executar(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            this.camposVazios(usuario);
            this.validarEmail(usuario.email);
            this.compararSenha(usuario.senha, usuario.senhaNovamente);
            yield this.verificarUsuario(usuario.email);
            const senhaCriptografada = this.provedorCripto.criptografar(usuario.senha);
            const novoUsuario = {
                id: id_1.default.gerarHash(),
                nome: usuario.nome,
                email: usuario.email,
                senha: senhaCriptografada
            };
            this.repositorio.inserir(novoUsuario);
        });
    }
    camposVazios(entrada) {
        const camposVazios = this.validarEntrada.verificarCamposVazios(entrada);
        if (camposVazios)
            throw new Error(erros_1.default.CAMPOS_OBRIGATORIOS);
    }
    compararSenha(senha, senhaConfirmacao) {
        const senhasSaoIguais = this.validarEntrada.compararSenhas(senha, senhaConfirmacao);
        if (!senhasSaoIguais)
            throw new Error(erros_1.default.SENHAS_DIFERENTES);
    }
    validarEmail(email) {
        const emailValido = this.validarEntrada.validarEmail(email);
        if (!emailValido)
            throw new Error(erros_1.default.EMAIL_INVALIDO);
    }
    verificarUsuario(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield this.repositorio.buscarPorEmail(email);
            if (usuario)
                throw new Error(erros_1.default.USUARIO_EXISTENTE);
        });
    }
}
exports.default = RegistrarUsuario;
