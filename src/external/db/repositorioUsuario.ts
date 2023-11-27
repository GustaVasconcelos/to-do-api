import Usuario from "../../core/usuarios/model/usuario";
import Db from "./db";

class RepositorioUsuarioPg {
    constructor (
        private db: Db,
    ) {}

    async inserir(usuario: Usuario): Promise<void> {
        await this.db.query(
            `
                INSERT INTO usuarios
                (id, nome, email, senha)
                VALUES ($1, $2, $3, $4)
            `,
            [usuario.id, usuario.nome, usuario.email, usuario.senha]
        );
    };

    async buscarPorEmail(email: string): Promise<Usuario> {
        const usuario = await this.db.query(
            `
                SELECT * FROM usuarios WHERE email = $1
            `,
            [email]
        );
    
        return usuario.rows[0] as Usuario;
    }

    async buscarPorId(id: string): Promise<Usuario> {
        const usuario = await this.db.query(
            `
                SELECT * FROM usuarios WHEREid = $1
            `,
            [id]
        );
    
        return usuario.rows[0] as Usuario;
    }
}

export default RepositorioUsuarioPg;