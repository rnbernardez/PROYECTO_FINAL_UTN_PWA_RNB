import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashUserMiddleware = async function (next) {
    try {
        // Solo hashear si es una modificación y no está ya hasheado
        if (this.isModified('password') && !this.password.startsWith('$2a$')) {
            this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
        }
        next();
    } catch (error) {
        next(error);
    }
};