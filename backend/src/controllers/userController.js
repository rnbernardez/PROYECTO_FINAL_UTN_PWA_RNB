import User, { USER_PROPS } from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar que se envíen ambos campos
        if (!email || !password) {
            return res.status(400).json({ ok: false, message: 'Email y contraseña son requeridos' });
        }

        // Buscar el usuario en la base de datos
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ ok: false, message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña ingresada con la almacenada encriptada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ ok: false, message: 'Contraseña incorrecta' });
        }

        // Generar el token JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email, username: user.username },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Enviar el token en la respuesta
        return res.status(200).json({ ok: true, token, userId: user._id, username: user.username });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error al autenticar', error: error.message });
    }
};

const registerController = async (req, res) => {
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

        // Verificar que los campos requeridos estén completos
        if (!email || !username || !password || !address) {
            return res.status(400).json({ ok: false, message: 'Email, usuario, contraseña y dirección son obligatorios' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ [USER_PROPS.EMAIL]: email });
        if (existingUser) {
            return res.status(400).json({ ok: false, message: 'El correo ya está registrado' });
        }

         // Hashear la contraseña
         const hashedPassword = await bcrypt.hash(password, 10);
         const hashedAddress = await bcrypt.hash(address, 10);

        // Crear nuevo usuario
        const newUser = new User({
            [USER_PROPS.EMAIL]: email,
            [USER_PROPS.USERNAME]: username,
            [USER_PROPS.PASSWORD]: hashedPassword, // Se hashea con el middleware
            [USER_PROPS.ADDRESS]: hashedAddress, // Se hashea con el middleware
            [USER_PROPS.PROFILE_PICTURE]: profile_picture || '',
            [USER_PROPS.IS_SELLING]: is_selling || [],
            [USER_PROPS.BOUGHT]: bought || [],
            [USER_PROPS.FAVS]: favs || [],
            [USER_PROPS.CARDS]: cards || [],
        });

        // Guardar en la base de datos
        await newUser.save();

        res.status(201).json({ ok: true, message: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error al registrar el usuario', error: error.message });
    }
};

const profileController = async (req, res) => {
    try {
        // Obtenemos el usuario desde req.user (ya decodificado en el middleware)
        const userId = req.user.id; 

        // Buscamos el usuario en la base de datos, excluyendo la contraseña
        const user = await User.findById(userId).select("-password");

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