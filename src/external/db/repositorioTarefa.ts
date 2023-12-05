
import RepositorioTarefa from "../../core/tarefas/service/repositorioTarefa";
import Tarefas from "../../core/tarefas/model/tarefas";
import Db from "./db";

class RepositorioTarefaPg implements RepositorioTarefa {
    constructor (
        private db: Db,
    ) {}

    async inserir(tarefa: Tarefas): Promise<void> {
        await this.db.query(
            `
                INSERT INTO tarefas
                (id, id_usuario, nome, descricao, prioridade)
                VALUES ($1, $2, $3, $4, $5)
            `,
            [ tarefa.id, tarefa.idUsuario ,tarefa.nome, tarefa.descricao, tarefa.prioridade ]
        );
    };

    async buscarTarefasPorIdUsuario(idUsuario: string): Promise<Tarefas[]> {
        const tarefas = await this.db.query(
            `
                SELECT id, id_usuario, nome, descricao, prioridade, status_conclusao FROM tarefas WHERE id_usuario = $1
            `,
            [ idUsuario ]
        );

        if (tarefas.rows.length > 0) {
            return tarefas.rows.map((row: any): Tarefas => {
                const {
                    id,
                    id_usuario: idUsuario,
                    nome,
                    descricao,
                    prioridade,
                    status_conclusao: statusConclusao,
                } = row;
        
                return {
                    id,
                    idUsuario,
                    nome,
                    descricao,
                    prioridade,
                    statusConclusao,
                };
            });
        } else {
            return [];
        }
    }
    
    async deletar (id: string) {
        await this.db.query(
            `
                DELETE FROM tarefas WHERE id = $1;
            `,
            [ id ]
        );
    }

    async buscarTarefaPorId(id: string): Promise<Tarefas | null> {
        const result = await this.db.query(
            `
                SELECT * FROM tarefas WHERE id = $1
            `,
            [id]
        );
    
        if (result.rows.length > 0) {
            const {
                id: tarefaId,
                id_usuario: idUsuario,
                nome,
                descricao,
                prioridade,
                status_conclusao: statusConclusao,
            } = result.rows[0];
    
            const tarefa: Tarefas = {
                id: tarefaId,
                idUsuario,
                nome,
                descricao,
                prioridade,
                statusConclusao,
            };
    
            return tarefa;
        }

        return null;
    }

    async editar(id: string, nome: string, descricao: string, prioridade: string, statusConclusao: boolean): Promise<void> {
        const tarefa = await this.db.query(
            `
                UPDATE tarefas
                SET nome = $2, descricao = $3, prioridade = $4, status_conclusao = $5
                WHERE id = $1
                RETURNING *
            `,
            [id, nome, descricao, prioridade, statusConclusao]
        );
    }   
}

export default RepositorioTarefaPg;