import Tarefas from '../model/tarefas'

interface RepositorioTarefa {
    inserir(tarefas: Tarefas): Promise <void>;

    buscarTarefasPorIdUsuario(idUsuario: string): Promise<Tarefas[]>;
}

export default RepositorioTarefa;