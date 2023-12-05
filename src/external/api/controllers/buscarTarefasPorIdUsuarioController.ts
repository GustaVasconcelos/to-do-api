import { Express, Request, Response } from 'express';
import BuscarTarefasUsuario from '../../../core/tarefas/service/buscarTarefasUsuario';

class BuscarTarefasPorIdUsuarioController {
    constructor(
        servidor: Express,
        casoDeUso: BuscarTarefasUsuario,
        ...middlewares: any[]
    ) {
        servidor.get('/api/tarefas/', ...middlewares, async (req: Request, res: Response) => {
            try {
                const idUsuario = (req as any).usuario.id;
                
                const tarefas = await casoDeUso.executar({
                    idUsuario
                });
                
                res.status(200).send(tarefas);
            } catch (erro: any) {
                res.status(400).send(erro.message);
            }
        })
    }
}

export default BuscarTarefasPorIdUsuarioController;