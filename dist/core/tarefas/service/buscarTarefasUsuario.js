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
const erros_1 = __importDefault(require("../../../core/shared/erros"));
class BuscarTarefasUsuario {
    constructor(repositorio, validarEntrada) {
        this.repositorio = repositorio;
        this.validarEntrada = validarEntrada;
    }
    executar(entrada) {
        return __awaiter(this, void 0, void 0, function* () {
            this.camposVazios(entrada);
            const tarefas = yield this.repositorio.buscarTarefasPorIdUsuario(entrada.idUsuario);
            this.verificarTarefas(tarefas);
            return tarefas;
        });
    }
    camposVazios(entrada) {
        const camposVazios = this.validarEntrada.verificarCamposVazios(entrada);
        if (camposVazios)
            throw new Error(erros_1.default.CAMPOS_OBRIGATORIOS);
    }
    verificarTarefas(tarefas) {
        if (!tarefas)
            throw new Error(erros_1.default.TAREFAS_NAO_CADASTRADAS);
    }
}
exports.default = BuscarTarefasUsuario;
