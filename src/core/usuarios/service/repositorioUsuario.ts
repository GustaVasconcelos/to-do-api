import Usuario from "../model/usuario";

interface RepositorioUsuario {
    inserir(usuario: Usuario): Promise <void>;

    buscarPorEmail(email: string): Promise<Usuario | null>;
}

export default RepositorioUsuario;