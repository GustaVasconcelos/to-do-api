import { Express, Request, Response } from 'express';
import RegistrarUsuario from '../../../core/usuarios/service/registrarUsuario'
import sucessos from 'core/shared/sucessos';
class RegistrarUsuarioController {
    constructor(
        servidor: Express,
        casoDeUso: RegistrarUsuario,
        ...middlewares: any[]
    ) {
        servidor.post('/api/usuarios/registrar', ...middlewares, async (req: Request, res: Response) => {
            try {
                const usuario = req.body;
    
                await casoDeUso.executar(usuario);
                
                res.status(201).send(sucessos.USUARIO_CADASTRADO);
            } catch (erro: any) {
                res.status(400).send(erro.message);
            }
        })
    }
}

export default RegistrarUsuarioController;