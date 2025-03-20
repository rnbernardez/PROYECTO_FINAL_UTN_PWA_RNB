import User, { USER_PROPS } from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { comparePasswords, generateToken, hashData } from "../utils/auth.utils.js"
import { findUserByEmail, createUser, findUserById } from '../repositories/userRepository.js';

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ ok: false, message: 'Email y contraseña son requeridos' });
        }

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ ok: false, message: 'Usuario no encontrado' });
        }

        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ ok: false, message: 'Contraseña incorrecta' });
        }

        const token = generateToken(user);

        return res.status(200).json({ ok: true, token, userId: user._id, username: user.username });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error al autenticar', error: error.message });
    }
};

export const registerController = async (req, res) => {
    try {
        const {
            email,
            username,
            password,
            address,
            profile_picture,
            is_selling,
            bought,
            favs,
            cards
        } = req.body;

        if (!email || !username || !password || !address) {
            return res.status(400).json({ ok: false, message: 'Email, usuario, contraseña y dirección son obligatorios' });
        }

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ ok: false, message: 'El correo ya está registrado' });
        }

        const hashedPassword = await hashData(password);
        const hashedAddress = await hashData(address);

        const userData = {
            email,
            username,
            password: hashedPassword,
            address: hashedAddress,
            profile_picture: profile_picture || '',
            is_selling: is_selling || [],
            bought: bought || [],
            favs: favs || [],
            cards: cards || [],
        };

        await createUser(userData);

        res.status(201).json({ ok: true, message: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error al registrar el usuario', error: error.message });
    }
};

const profileController = async (req, res) => {
    try {
        const userId = req.user.id; 

        const user = await findUserById(userId);

        if (!user) {
            return res.status(404).json({ ok: false, message: "Usuario no encontrado" });
        }

        return res.json({
            ok: true,
            message: "Perfil obtenido correctamente",
            user
        });
    } catch (error) {
        return res.status(500).json({ ok: false, message: "Error al obtener el perfil" });
    }
};

export { loginController, registerController, profileController }