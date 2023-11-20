import CasoDeUso from "@/core/shared/casoDeUso";
import Usuario from "../model/usuario";
import ProvedorCriptografia from "./provedorCriptografia";
import RepositorioUsuario from "./repositorioUsuario";
import erros from "@/core/shared/erros";
import Id from "@/core/shared/id";

export type registrarUsuarioEntrada = {
    nome: string
    email: string;
    senha: string;
}

class RegistrarUsuario implements CasoDeUso<registrarUsuarioEntrada, void> {
    constructor (
        private provedorCripto: ProvedorCriptografia,
        private repositorio: RepositorioUsuario
    ) {}

    async executar(usuario: registrarUsuarioEntrada): Promise<void> {
        const senhaCriptografada = this.provedorCripto.criptografar(usuario.senha);
        const usuarioExistente = await this.repositorio.buscarPorEmail(usuario.email);

        if (usuarioExistente) throw new Error(erros.USUARIO_EXISTENTE);

        const novoUsuario: Usuario = {
            id: Id.gerarHash(),
            nome: usuario.nome,
            email: usuario.email,
            senha: senhaCriptografada
        }

        this.repositorio.inserir(novoUsuario);
    }
}

export default RegistrarUsuario;