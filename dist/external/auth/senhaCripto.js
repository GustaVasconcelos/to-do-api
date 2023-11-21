"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class SenhaCripto {
    criptografar(texto) {
        const salt = bcrypt_1.default.genSaltSync(10);
        return bcrypt_1.default.hashSync(texto, salt);
    }
    comparar(senha, senhaCriptografada) {
        return bcrypt_1.default.compareSync(senha, senhaCriptografada);
    }
}
exports.default = SenhaCripto;
