import CasoDeUso from "../../../core/shared/casoDeUso";
import RepositorioTarefa from "./repositorioTarefa";
import ValidarEntrada from "./validarEntrada";
import erros from "../../../core/shared/erros";

export type deletarTarefaEntrada = {
    id: string
}
class DeletarTarefa implements CasoDeUso<deletarTarefaEntrada, void> {
    constructor (
        private repositorio: RepositorioTarefa,
        private validarEntrada: ValidarEntrada
    ) {}

    async executar(entrada: deletarTarefaEntrada): Promise<void> {
        this.camposVazios(entrada);

        await this.repositorio.deletar(entrada.id);
    }

    private camposVazios (
        entrada: deletarTarefaEntrada
    ): void {
        const camposVazios = this.validarEntrada.verificarCamposVazios(entrada);

        if (camposVazios) throw new Error(erros.CAMPOS_OBRIGATORIOS);
    }

}

export default DeletarTarefa;