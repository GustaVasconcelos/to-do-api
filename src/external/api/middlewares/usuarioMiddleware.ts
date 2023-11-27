import { Request, Response, NextFunction } from "express"
import ProvedorJwt from "../utils/provedorJwt";
import Usuario from "../../../core/usuarios/model/usuario";
import RepositorioUsuario from "../../../core/usuarios/service/repositorioUsuario";
import erros from "../../../core/shared/erros";

const usuarioMiddleware = (repositorio: RepositorioUsuario) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const acessoNegado = () => res.status(403).send(erros.TOKEN_INVALIDO);
        const token = req.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
            return acessoNegado();
        }

        const provedorJwt = new ProvedorJwt(process.env.JWT_SECRET!);

        try {
            const usuarioToken = provedorJwt.obter(token) as Usuario;

            const usuario = await repositorio.buscarPorEmail(usuarioToken.email);

            if (!usuario) {
                return acessoNegado();
            }

            (req as any).usuario = usuario;

            next();
        } catch (error) {
            return acessoNegado();
        }
    };
};

export default usuarioMiddleware;