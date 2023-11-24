"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class ProvedorJwt {
    constructor(segredo) {
        this.segredo = segredo;
    }
    gerar(dados) {
        return jsonwebtoken_1.default.sign(dados, this.segredo, {
            expiresIn: "1d",
        });
    }
    obter(token) {
        return jsonwebtoken_1.default.verify(token, this.segredo);
    }
}
exports.default = ProvedorJwt;
