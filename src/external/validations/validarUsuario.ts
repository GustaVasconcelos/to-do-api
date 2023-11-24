import ValidarEntrada from "../../core/usuarios/service/validarEntrada";
import validator from "validator";

class ValidarUsuario implements ValidarEntrada {

    validarEmail(email: string): boolean {
        return validator.isEmail(email);
    }

    verificarCamposVazios(obj: Record<string, string | undefined | null>): boolean {
        return Object.values(obj).some(value => !value || value.trim() === '');
    }

    compararSenhas(senha: string, confirmacaoSenha: string): boolean {
        return senha === confirmacaoSenha;
    }
}

export default ValidarUsuario;

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