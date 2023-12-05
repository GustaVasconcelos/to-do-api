import { Express, Request, Response } from 'express';
import DeletarTarefa from '../../../core/tarefas/service/deletarTarefa';
import sucessos from '../../../core/shared/sucessos';

class DeletarTarefaController {
    constructor(
        servidor: Express,
        casoDeUso: DeletarTarefa,
        ...middlewares: any[]
    ) {
        servidor.delete('/api/tarefas/deletar/:id', ...middlewares, async (req: Request, res: Response) => {
            try {
                const id = req.params.id;
                
                await casoDeUso.executar({
                    id
                });
                
                res.status(200).send(sucessos.TAREFA_DELETADA);
            } catch (erro: any) {
                res.status(400).send(erro.message);
            }
        })
    }
}

export default DeletarTarefaController;