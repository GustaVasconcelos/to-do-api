import CasoDeUso from "../../../core/shared/casoDeUso";
import RepositorioTarefa from "./repositorioTarefa";
import erros from "../../../core/shared/erros";
import Tarefas from "../model/tarefas";

export type editarTarefaEntrada = {
    id: string,
    nome?: string,
    descricao?: string,
    prioridade?: string,
    statusConclusao?: boolean
}
class EditarTarefa implements CasoDeUso<editarTarefaEntrada, void> {
    constructor (
        private repositorio: RepositorioTarefa
    ) {}

    async executar(entrada: editarTarefaEntrada): Promise<void> {
        const tarefa = await this.verificarTarefa(entrada.id);
        
        if (tarefa) {
            await this.repositorio.editar(
                entrada.id,
                entrada.nome ?? tarefa.nome,
                entrada.descricao ?? tarefa.descricao,
                entrada.prioridade ?? tarefa.prioridade,
                entrada.statusConclusao ?? tarefa.statusConclusao ?? false
            );
        }
    }

    private verificarTarefa (
        id: string
    ): Promise<Tarefas | null> {
        const tarefa = this.repositorio.buscarTarefaPorId(id);

        if (!tarefa) throw new Error(erros.TAREFA_NAO_ENCONTRADA);

        return tarefa
    }

}

export default EditarTarefa;