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
Object.defineProperty(exports, "__esModule", { value: true });
class RepositorioTarefaPg {
    constructor(db) {
        this.db = db;
    }
    inserir(tarefa) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.query(`
                INSERT INTO tarefas
                (id, id_usuario, nome, descricao, prioridade, status_conclusao)
                VALUES ($1, $2, $3, $4, $5, $6)
            `, [tarefa.id, tarefa.idUsuario, tarefa.nome, tarefa.descricao, tarefa.prioridade, tarefa.statusConclusao]);
        });
    }
    ;
    buscarTarefasPorIdUsuario(idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const tarefas = yield this.db.query(`
                SELECT FROM tarefas WHERE id_usuario = $1
            `, [idUsuario]);
            if (tarefas.rows.length > 0) {
                return tarefas.rows.map((row) => {
                    const { id, id_usuario: idUsuario, nome, descricao, prioridade, status_conclusao: statusConclusao, } = row;
                    return {
                        id,
                        idUsuario,
                        nome,
                        descricao,
                        prioridade,
                        statusConclusao,
                    };
                });
            }
            else {
                return [];
            }
        });
    }
}
exports.default = RepositorioTarefaPg;
