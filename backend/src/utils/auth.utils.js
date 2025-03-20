import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const comparePasswords = async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
};

const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, email: user.email, username: user.username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

const hashData = async (data) => {
    return await bcrypt.hash(data, 10);
};

export { comparePasswords, generateToken, hashData };