import jwt from 'jsonwebtoken';
import ENVIROMENT from "../config/enviromentconfig.js";
import { ServerError } from "../utils/error.utils.js";

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, ENVIROMENT.JWT_SECRET_KEY);
    } catch (error) {
        throw new ServerError('Token inválido o vencido', 400);
    }
};