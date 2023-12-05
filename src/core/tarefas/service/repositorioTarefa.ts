import Tarefas from '../model/tarefas'

interface RepositorioTarefa {
    inserir(tarefas: Tarefas): Promise <void>;

    buscarTarefasPorIdUsuario(idUsuario: string): Promise<Tarefas[]>;

    deletar(id: string): Promise <void>;

    buscarTarefaPorId(id: string): Promise<Tarefas | null>;

    editar(id: string, nome: string, descricao: string, prioridade: string, statusConclusao: boolean): Promise<void>;
}

export default RepositorioTarefa;