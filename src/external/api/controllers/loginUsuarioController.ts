import LoginUsuario from "core/usuarios/service/loginUsuario";
import { Express, Request, Response } from "express";
import ProvedorJwt from "../utils/provedorJwt";


class LoginUsuarioController {
    constructor (
        servidor: Express,
        casoDeUso: LoginUsuario,
        ...middlewares: any[]
    ) {
        servidor.post('/api/usuarios/login', ...middlewares, async (req: Request, res: Response) => {
            try {
                const usuario = req.body;

                await casoDeUso.executar(usuario);

                const provedorJwt = new ProvedorJwt(process.env.JWT_SECRET!);
                
                res.status(200).send(provedorJwt.gerar(usuario));
            } catch (erro: any) {
                res.status(400).send(erro.message);
            }
        });
    }
}

export default LoginUsuarioController;