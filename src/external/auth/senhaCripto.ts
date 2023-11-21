import ProvedorCriptografia from '../../core/usuarios/service/provedorCriptografia';
import bcrypt from 'bcrypt';

class SenhaCripto implements ProvedorCriptografia {
    criptografar(texto: string): string {
        const salt = bcrypt.genSaltSync(10);

        return bcrypt.hashSync(texto, salt);
    }

    comparar(senha: string, senhaCriptografada: string): boolean {
        return bcrypt.compareSync(senha, senhaCriptografada);
    }
}

export default SenhaCripto;