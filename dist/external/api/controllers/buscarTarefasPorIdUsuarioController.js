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
class BuscarTarefasPorIdUsuarioController {
    constructor(servidor, casoDeUso, ...middlewares) {
        servidor.get('/api/tarefas/', ...middlewares, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idUsuario = req.usuario.id;
                const tarefas = yield casoDeUso.executar({
                    idUsuario
                });
                res.status(200).send(tarefas);
            }
            catch (erro) {
                res.status(400).send(erro.message);
            }
        }));
    }
}
exports.default = BuscarTarefasPorIdUsuarioController;
