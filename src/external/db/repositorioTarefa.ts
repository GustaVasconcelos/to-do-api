
import Tarefas from "../../core/tarefas/model/tarefas";
import Db from "./db";

class RepositorioTarefaPg {
    constructor (
        private db: Db,
    ) {}

    async inserir(tarefa: Tarefas): Promise<void> {
        await this.db.query(
            `
                INSERT INTO tarefas
                (id, id_usuario, nome, descricao, prioridade, status_conclusao)
                VALUES ($1, $2, $3, $4, $5, $6)
            `,
            [ tarefa.id, tarefa.idUsuario ,tarefa.nome, tarefa.descricao, tarefa.prioridade, tarefa.statusConclusao ]
        );
    };

    async buscarTarefasPorIdUsuario(idUsuario: string): Promise<Tarefas[]> {
        const tarefas = await this.db.query(
            `
                SELECT FROM tarefas WHERE id_usuario = $1
            `,
            [ idUsuario ]
        )

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
    


}

export default RepositorioTarefaPg;