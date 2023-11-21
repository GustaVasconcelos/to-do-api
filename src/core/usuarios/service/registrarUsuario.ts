import CasoDeUso from "../../shared/casoDeUso";
import Usuario from "../model/usuario";
import ProvedorCriptografia from "./provedorCriptografia";
import ValidarEntrada from "./validarEntrada";
import RepositorioUsuario from "./repositorioUsuario";
import erros from '../../shared/erros';
import Id from "../../shared/id";

export type registrarUsuarioEntrada = {
    nome: string
    email: string;
    senha: string;
    senhaNovamente: string;
}

class RegistrarUsuario implements CasoDeUso<registrarUsuarioEntrada, void> {
    constructor (
        private provedorCripto: ProvedorCriptografia,
        private repositorio: RepositorioUsuario,
        private validarEntrada: ValidarEntrada,
    ) {}

    async executar(usuario: registrarUsuarioEntrada): Promise<void> {
        if (this.validarEntrada.verificarCamposVazios(usuario)) throw new Error(erros.CAMPOS_OBRIGATORIOS);
        
        if (!this.validarEntrada.validarEmail(usuario.email)) throw new Error(erros.EMAIL_INVALIDO);
        
        if (!this.validarEntrada.compararSenhas(usuario.senha, usuario.senhaNovamente)) throw new Error(erros.SENHAS_DIFERENTES);
        
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