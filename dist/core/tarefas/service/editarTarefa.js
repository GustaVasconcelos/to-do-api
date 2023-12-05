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
class EditarTarefa {
    constructor(repositorio) {
        this.repositorio = repositorio;
    }
    executar(entrada) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const tarefa = yield this.verificarTarefa(entrada.id);
            if (tarefa) {
                yield this.repositorio.editar(entrada.id, (_a = entrada.nome) !== null && _a !== void 0 ? _a : tarefa.nome, (_b = entrada.descricao) !== null && _b !== void 0 ? _b : tarefa.descricao, (_c = entrada.prioridade) !== null && _c !== void 0 ? _c : tarefa.prioridade, (_e = (_d = entrada.statusConclusao) !== null && _d !== void 0 ? _d : tarefa.statusConclusao) !== null && _e !== void 0 ? _e : false);
            }
        });
    }
    verificarTarefa(id) {
        const tarefa = this.repositorio.buscarTarefaPorId(id);
        if (!tarefa)
            throw new Error(erros_1.default.TAREFA_NAO_ENCONTRADA);
        return tarefa;
    }
}
exports.default = EditarTarefa;
