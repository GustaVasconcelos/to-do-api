import CasoDeUso from "@/core/shared/casoDeUso";
import Usuario from "../model/usuario";
import ProvedorCriptografia from "./provedorCriptografia";
import RepositorioUsuario from "./repositorioUsuario";
import erros from "@/core/shared/erros";


export type loginUsuarioEntrada = {
    email: string;
    senha: string;
}

class LoginUsuario implements CasoDeUso<loginUsuarioEntrada, Usuario> {
    constructor (
        private provedorCripto: ProvedorCriptografia,
        private repositorio: RepositorioUsuario
    ) {}

    async executar(usuario: loginUsuarioEntrada): Promise<Usuario> {
        const usuarioExistente = await this.repositorio.buscarPorEmail(usuario.email);

        if (!usuarioExistente) throw new Error(erros.USUARIO_INEXISTENTE);

        const compararSenhas = this.provedorCripto.comparar(
            usuario.senha, 
            usuarioExistente.senha!
        );

        if (!compararSenhas) throw new Error(erros.USUARIO_INEXISTENTE);

        return {
            ...usuarioExistente,
            senha: undefined
        }
        
    }
}

export default LoginUsuario;