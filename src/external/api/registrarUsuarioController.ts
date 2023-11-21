import { Express, Request, Response } from 'express';
import RegistrarUsuario from '../../core/usuarios/service/registrarUsuario'
class RegistrarUsuarioController {
    constructor(
        private servidor: Express,
        private casoDeUso: RegistrarUsuario,
    ) {
        this.registrarRotas();
    }

    private registrarRotas() {
        this.servidor.post('/api/usuarios/registrar', this.registrarUsuario.bind(this));
    }

    private async registrarUsuario(req: Request, res: Response) {
        try {
            const usuario = req.body;

            await this.casoDeUso.executar(usuario);
            
            res.status(201).send();
        } catch (erro: any) {
            res.status(400).send(erro.message);
        }
    }
}

export default RegistrarUsuarioController;