import Tarefas from '../model/tarefas'

interface RepositorioTarefa {
    inserir(tarefas: Tarefas): Promise <void>;

    buscarTarefasPorIdUsuario(idUsuario: string): Promise<Tarefas[]>;

    deletar(id: string): Promise <void>;
}

export default RepositorioTarefa;