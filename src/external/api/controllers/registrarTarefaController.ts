import { Express, Request, Response } from 'express';
import RegistrarTarefa from '../../../core/tarefas/service/registrarTarefa';
import sucessos from '../../../core/shared/sucessos';

class RegistrarTarefaController {
    constructor(
        servidor: Express,
        casoDeUso: RegistrarTarefa,
        ...middlewares: any[]
    ) {
        servidor.post('/api/tarefas/registrar', ...middlewares, async (req: Request, res: Response) => {
            try {
                const tarefa = {
                    idUsuario: (req as any).usuario.id,
                    nome: req.body.nome,
                    descricao: req.body.descricao,
                    prioridade: req.body.prioridade
                };
                
                await casoDeUso.executar(tarefa);
                
                res.status(201).send(sucessos.TAREFA_CADASTRADA);
            } catch (erro: any) {
                res.status(400).send(erro.message);
            }
        })
    }
}

export default RegistrarTarefaController;