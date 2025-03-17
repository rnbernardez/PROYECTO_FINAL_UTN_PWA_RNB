import ENVIROMENT from "../config/enviromentconfig.js";
import { ServerError } from "../utils/error.utils.js";
import jwt from 'jsonwebtoken';

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

        try {
            const user_info = jwt.verify(authorization_token, ENVIROMENT.JWT_SECRET_KEY);
            request.user = user_info;
            next();
        } catch (error) {
            throw new ServerError('Token inválido o vencido', 400);
        }
    } catch (error) {
        console.log("Error al autenticar:", error.message);

        if (error.status) {
            return response.json({
                ok: false,
                status: error.status,
                message: error.message
            });
        }

        response.json({
            status: 500,
            ok: false,
            message: "Internal server error"
        });
    }
};
