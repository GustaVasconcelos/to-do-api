import { Express, Request, Response } from 'express';
import sucessos from '../../../core/shared/sucessos';
import EditarTarefa from '../../../core/tarefas/service/editarTarefa';

class EditarTarefaPorIdController {
    constructor(
        servidor: Express,
        casoDeUso: EditarTarefa,
        ...middlewares: any[]
    ) {
        servidor.post('/api/tarefas/:id', ...middlewares, async (req: Request, res: Response) => {
            try {
                const id = req.params.id;
                const { 
                    nome, 
                    descricao, 
                    prioridade, 
                    statusConclusao 
                } = req.body;

                await casoDeUso.executar({
                    id,
                    nome, 
                    descricao, 
                    prioridade, 
                    statusConclusao 
                });
                
                res.status(200).send(sucessos.TAREFA_ATUALIZADA);
            } catch (erro: any) {
                res.status(400).send(erro.message);
            }
        })
    }
}

export default EditarTarefaPorIdController;