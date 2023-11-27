"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const provedorJwt_1 = __importDefault(require("../utils/provedorJwt"));
const erros_1 = __importDefault(require("../../../core/shared/erros"));
const usuarioMiddleware = (repositorio) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const acessoNegado = () => res.status(403).send(erros_1.default.TOKEN_INVALIDO);
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            return acessoNegado();
        }
        const provedorJwt = new provedorJwt_1.default(process.env.JWT_SECRET);
        try {
            const usuarioToken = provedorJwt.obter(token);
            const usuario = yield repositorio.buscarPorEmail(usuarioToken.email);
            if (!usuario) {
                return acessoNegado();
            }
            req.usuario = usuario;
            next();
        }
        catch (error) {
            return acessoNegado();
        }
    });
};
exports.default = usuarioMiddleware;
