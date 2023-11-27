import CasoDeUso from "../../shared/casoDeUso";
import erros from '../../shared/erros';
import Id from "../../shared/id";
import Tarefas from "../model/tarefas";
import RepositorioTarefa from "./repositorioTarefa";
import ValidarEntrada from "./validarEntrada";


export type registrarTarefaEntrada = {
    idUsuario: string,
    nome: string,
    descricao: string,
    prioridade: string,
}

class RegistrarTarefa implements CasoDeUso<registrarTarefaEntrada, void> {
    constructor (
        private repositorio: RepositorioTarefa,
        private validarEntrada: ValidarEntrada
    ) {}

    async executar(tarefa: registrarTarefaEntrada): Promise<void> {
        this.camposVazios(tarefa);

        const novaTarefa: Tarefas = {
            id: Id.gerarHash(),
            idUsuario: tarefa.idUsuario,
            nome: tarefa.nome,
            descricao: tarefa.descricao,
            prioridade: tarefa.prioridade,
        };

        await this.repositorio.inserir(novaTarefa);
    }

    private camposVazios (
        entrada: registrarTarefaEntrada
    ): void {
        const camposVazios = this.validarEntrada.verificarCamposVazios(entrada);

        if (camposVazios) throw new Error(erros.CAMPOS_OBRIGATORIOS);
    }
}

export default RegistrarTarefa;