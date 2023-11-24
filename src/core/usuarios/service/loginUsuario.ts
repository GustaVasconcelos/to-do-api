import CasoDeUso from "../../shared/casoDeUso";
import Usuario from "../model/usuario";
import ProvedorCriptografia from "./provedorCriptografia";
import RepositorioUsuario from "./repositorioUsuario";
import erros from '../../shared/erros';
import ValidarEntrada from "./validarEntrada";

export type loginUsuarioEntrada = {
    email: string;
    senha: string;
}

class LoginUsuario implements CasoDeUso<loginUsuarioEntrada, Usuario> {
    constructor (
        private provedorDeCriptografia: ProvedorCriptografia,
        private repositorio: RepositorioUsuario,
        private validarEntrada: ValidarEntrada

    ) {}

    async executar(usuario: loginUsuarioEntrada): Promise<Usuario> {
        this.camposVazios(usuario);
        
        this.validarEmail(usuario.email);

        const usuarioExistente = await this.verificarUsuario(usuario.email);

        this.compararSenhas(usuario.senha, usuarioExistente.senha!)
        
        return {
            ...usuarioExistente,
            senha: undefined
        }
    }

    private camposVazios (
        entrada: loginUsuarioEntrada
    ): void {
        const camposVazios = this.validarEntrada.verificarCamposVazios(entrada);

        if (camposVazios) throw new Error(erros.CAMPOS_OBRIGATORIOS);
    }

    private compararSenhas(
        senha: string,
        senhaBancoDeDados: string
    ): void {
        const compararSenhas = this.provedorDeCriptografia.comparar(
            senha, 
            senhaBancoDeDados
        );
        
        if (!compararSenhas) throw new Error(erros.SENHA_INCORRETA);
    }

    private validarEmail(
        email: string
    ): void {
        const emailValido = this.validarEntrada.validarEmail(email);

        if (!emailValido) throw new Error(erros.EMAIL_INVALIDO);
    }

    private verificarUsuario(
        email: string
    ): Promise<Usuario> {
        const usuario = this.repositorio.buscarPorEmail(email);

        if (!usuario) throw new Error(erros.USUARIO_INEXISTENTE);

        return usuario;
    }
    
}

export default LoginUsuario;