import ValidarEntrada from "@/core/usuarios/service/validarEntrada";
import validator from "validator";

class ValidarUsuario implements ValidarEntrada {
    validarEmail(email: string): boolean {
        return validator.isEmail(email);
    }

    verificarCamposVazios(obj: Record<string, string>): boolean {
        return Object.values(obj).some(value => !value);
    }

    compararSenhas(senha: string, confirmacaoSenha: string): boolean {
        return senha === confirmacaoSenha;
    }
}

export default ValidarUsuario;