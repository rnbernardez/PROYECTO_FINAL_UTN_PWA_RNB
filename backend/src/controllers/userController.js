import User, { USER_PROPS } from "../models/userModel.js"

const loginController = (req, res) => {
    res.send("login")
}

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

        // Crear nuevo usuario
        const newUser = new User({
            [USER_PROPS.EMAIL]: email,
            [USER_PROPS.USERNAME]: username,
            [USER_PROPS.PASSWORD]: password, // Se hashea con el middleware
            [USER_PROPS.ADDRESS]: address, // Se hashea con el middleware
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

const profileController = (req, res) => {
    res.send("profile")
}

export { loginController, registerController, profileController }