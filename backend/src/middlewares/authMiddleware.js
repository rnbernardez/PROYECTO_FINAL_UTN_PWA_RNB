import { ServerError, handleError } from "../utils/error.utils.js";
import { verifyToken } from "../utils/token.utils.js";

export const authMiddleware = (request, response, next) => {
    try {
        const authorization_header = request.headers['authorization'];

        // Verificar si el header de autorización está presente
        if (!authorization_header) {
            throw new ServerError('No has proporcionado un header de autorización', 401);
        }

        // Extraer el token
        const authorization_token = authorization_header.split(' ')[1];

        // Verificar si el token está presente
        if (!authorization_token) {
            throw new ServerError('No has proporcionado un token de autorización', 401);
        }

        // Verificar la validez del token y obtener la información del usuario
        const user_info = verifyToken(authorization_token);

        // Asignar la información del usuario al objeto request
        request.user = user_info;

        // Pasar al siguiente middleware o controlador
        next();
    } catch (error) {
        handleError(response, error);
    }
};