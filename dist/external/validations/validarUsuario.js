"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
class ValidarUsuario {
    validarEmail(email) {
        return validator_1.default.isEmail(email);
    }
    verificarCamposVazios(obj) {
        return Object.values(obj).some(value => !value || value.trim() === '');
    }
    compararSenhas(senha, confirmacaoSenha) {
        return senha === confirmacaoSenha;
    }
}
exports.default = ValidarUsuario;
// class ProvedorJwt {
//     constructor(
//         private segredo: string,
//     ) {}
//     gerar(dados: string | object): string {
//         return jwt.sign(dados, this.segredo, {
//             expiresIn: "1d",
//         });
//     }
//     obter(token: string): string | object {
//         return jwt.verify(token, this.segredo);
//     }
// }
// export default ProvedorJwt;
