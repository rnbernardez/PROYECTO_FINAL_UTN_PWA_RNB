import User, { USER_PROPS } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { comparePasswords, generateToken, hashData } from "../utils/auth.utils.js";
import { findUserByEmail, createUser, findUserById, updateUserVerification, verifyUserAccount } from '../repository/userRepository.js';
import { sendVerificationEmail } from "../utils/mailer.utils.js";
import crypto from "crypto";

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

        if (!user.verified) {
            return res.status(401).json({ ok: false, message: 'Debes verificar tu cuenta antes de iniciar sesión' });
        }

        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ ok: false, message: 'Contraseña incorrecta' });
        }

        const token = generateToken(user);

        return res.status(200).json({ 
            ok: true, 
            token, 
            userId: user._id, 
            message: 'Inicio de sesión exitoso'
        });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error al autenticar', error: error.message });
    }
};

const registerController = async (req, res) => {
    try {
        console.log("📌 Iniciando registro de usuario...");
        console.log("📌 Datos recibidos:", req.body);

        const { email, username, password, address } = req.body;

        // Validación básica
        if (!email || !username || !password || !address) {
            return res.status(400).json({ 
                ok: false, 
                message: 'Email, usuario, contraseña y dirección son obligatorios' 
            });
        }

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ 
                ok: false, 
                message: 'El correo ya está registrado' 
            });
        }

        const verificationToken = crypto.randomBytes(32).toString("hex");

        // Envía la contraseña en texto plano (el middleware la hasheará)
        const userData = {
            email,
            username,
            password, // <-- Cambio clave aquí
            address,
            verified: false,
            verification_token: verificationToken,
            profile_picture: '',
            is_selling: [],
            bought: [],
            favs: [],
            cards: []
        };

        const newUser = await createUser(userData);
        
        try {
            await sendVerificationEmail(email, verificationToken);
        } catch (emailError) {
            console.error("Error enviando correo:", emailError);
        }

        res.status(201).json({ 
            ok: true, 
            message: 'Usuario registrado con éxito. Verifica tu correo.' 
        });

    } catch (error) {
        console.error("❌ Error en el registro:", error);
        res.status(500).json({ 
            ok: false, 
            message: 'Error al registrar el usuario', 
            error: error.message 
        });
    }
};

const verifyAccountController = async (req, res) => {
    try {
        const { token } = req.params;
        console.log("🔑 Token recibido:", token);

        if (!token || token.length < 10) {
            return res.status(400).json({
                ok: false,
                message: 'Token de verificación inválido'
            });
        }

        const user = await verifyUserAccount(token);
        
        if (!user) {
            console.log("⚠️ Token no válido o usuario ya verificado");
            return res.status(400).json({
                ok: false,
                message: 'El enlace de verificación no es válido o ya fue utilizado'
            });
        }

        console.log("✅ Usuario verificado:", user.email);
        return res.status(200).json({
            ok: true,
            message: 'Cuenta verificada con éxito',
            user: {
                email: user.email,
                verified: user.verified
            }
        });
    } catch (error) {
        console.error("❌ Error en verifyAccountController:", error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor al verificar la cuenta',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

const profileController = async (req, res) => {
    try {
        const userId = req.user.id; 

        const user = await findUserById(userId).select('-password');

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

export { loginController, registerController, verifyAccountController, profileController };
