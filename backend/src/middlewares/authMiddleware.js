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

        // Cambio clave (usa 'id' en lugar de 'userId')
        if (!user_info?.id) {
            throw new ServerError('Token inválido: falta información de usuario', 401);
        }

        request.user = {
            id: user_info.id // Mantiene consistencia con el token
        };

        next();
    } catch (error) {
        handleError(response, error);
    }
};