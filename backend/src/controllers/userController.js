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

        // Verificar usuario existente
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ 
                ok: false, 
                message: 'El correo ya está registrado' 
            });
        }

        // Hashear solo la contraseña
        const hashedPassword = await hashData(password);
        const verificationToken = crypto.randomBytes(32).toString("hex");

        // Crear objeto de usuario simplificado
        const userData = {
            email,
            username,
            password: hashedPassword,
            address, // Guardar dirección en texto plano
            verified: false,
            verification_token: verificationToken,
            // Valores por defecto para campos opcionales
            profile_picture: '',
            is_selling: [],
            bought: [],
            favs: [],
            cards: []
        };

        // Crear usuario
        const newUser = await createUser(userData);
        
        // Intentar enviar correo (pero no fallar si hay error)
        try {
            await sendVerificationEmail(email, verificationToken);
        } catch (emailError) {
            console.error("Error enviando correo:", emailError);
            // No retornes error, solo registra el problema
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

        const user = await verifyUserAccount(token);

        if (!user) {
            return res.status(400).json({ 
                ok: false, 
                message: 'Token inválido, ya usado o cuenta ya verificada' 
            });
        }

        res.status(200).json({ 
            ok: true, 
            message: 'Cuenta verificada con éxito',
            user: {
                email: user.email,
                verified: user.verified
            }
        });
    } catch (error) {
        console.error("Error en verificación:", error);
        res.status(500).json({ 
            ok: false, 
            message: 'Error al verificar cuenta', 
            error: error.message 
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
