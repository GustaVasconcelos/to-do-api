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
const sucessos_1 = __importDefault(require("../../../core/shared/sucessos"));
class RegistrarTarefaController {
    constructor(servidor, casoDeUso, ...middlewares) {
        servidor.post('/api/tarefas', ...middlewares, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tarefa = {
                    idUsuario: req.usuario.id,
                    nome: req.body.nome,
                    descricao: req.body.descricao,
                    prioridade: req.body.prioridade
                };
                yield casoDeUso.executar(tarefa);
                res.status(201).send(sucessos_1.default.TAREFA_CADASTRADA);
            }
            catch (erro) {
                res.status(400).send(erro.message);
            }
        }));
    }
}
exports.default = RegistrarTarefaController;
