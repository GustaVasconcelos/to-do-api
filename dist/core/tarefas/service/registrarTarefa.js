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
class RegistrarTarefa {
    constructor(repositorio, validarEntrada) {
        this.repositorio = repositorio;
        this.validarEntrada = validarEntrada;
    }
    executar(tarefa) {
        return __awaiter(this, void 0, void 0, function* () {
            this.camposVazios(tarefa);
            const novaTarefa = {
                id: id_1.default.gerarHash(),
                idUsuario: tarefa.idUsuario,
                nome: tarefa.nome,
                descricao: tarefa.descricao,
                prioridade: tarefa.prioridade,
            };
            yield this.repositorio.inserir(novaTarefa);
        });
    }
    camposVazios(entrada) {
        const camposVazios = this.validarEntrada.verificarCamposVazios(entrada);
        if (camposVazios)
            throw new Error(erros_1.default.CAMPOS_OBRIGATORIOS);
    }
}
exports.default = RegistrarTarefa;
