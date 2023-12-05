import CasoDeUso from "../../../core/shared/casoDeUso";
import RepositorioTarefa from "./repositorioTarefa";
import ValidarEntrada from "./validarEntrada";
import erros from "../../../core/shared/erros";
import Tarefas from "../model/tarefas";

export type buscarTarefasUsuarioEntrada = {
    idUsuario: string
}
class BuscarTarefasUsuario implements CasoDeUso<buscarTarefasUsuarioEntrada, Tarefas[]> {
    constructor (
        private repositorio: RepositorioTarefa,
        private validarEntrada: ValidarEntrada,
    ) {}

    async executar(entrada: buscarTarefasUsuarioEntrada): Promise<Tarefas[]> {
        this.camposVazios(entrada);

        const tarefas = await this.repositorio.buscarTarefasPorIdUsuario(entrada.idUsuario);

        this.verificarTarefas(tarefas);

        return tarefas;
    }

    private camposVazios (
        entrada: buscarTarefasUsuarioEntrada
    ): void {
        const camposVazios = this.validarEntrada.verificarCamposVazios(entrada);

        if (camposVazios) throw new Error(erros.CAMPOS_OBRIGATORIOS);
    }

    private verificarTarefas (
        tarefas: Tarefas[]
    ): void {
        if (!tarefas) throw new Error(erros.TAREFAS_NAO_CADASTRADAS);
    }
}

export default BuscarTarefasUsuario;