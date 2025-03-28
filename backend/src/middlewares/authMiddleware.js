import { ServerError, handleError } from "../utils/error.utils.js";
import { verifyToken } from "../utils/token.utils.js";

export const authMiddleware = (request, response, next) => {
    try {
        const authorization_header = request.headers['authorization'];

        if (!authorization_header) {
            throw new ServerError('No has proporcionado un header de autorización', 401);
        }

        const authorization_token = authorization_header.split(' ')[1];

        if (!authorization_token) {
            throw new ServerError('No has proporcionado un token de autorización', 401);
        }

        const user_info = verifyToken(authorization_token);
        
        // Cambio 1: Verificar userId en lugar de id
        if (!user_info?.userId) {
            throw new ServerError('Token inválido: falta userId en el token', 401);
        }

        // Cambio 2: Mapear userId a id para mantener compatibilidad
        request.user = {
            id: user_info.userId // Mantiene el formato que esperan los controladores
        };

        next();
    } catch (error) {
        handleError(response, error);
    }
};