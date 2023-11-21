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
class RepositorioUsuario {
    constructor(db) {
        this.db = db;
    }
    inserir(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.query(`
                INSERT INTO usuarios
                (id, nome, email, senha)
                VALUES ($1, $2, $3, $4)
            `, [usuario.id, usuario.nome, usuario.email, usuario.senha]);
        });
    }
    ;
    buscarPorEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield this.db.query(`
                SELECT * FROM usuarios WHERE email = $1
            `, [email]);
            return usuario.rows[0];
        });
    }
}
exports.default = RepositorioUsuario;
