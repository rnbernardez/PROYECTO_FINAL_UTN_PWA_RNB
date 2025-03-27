import User from '../models/userModel.js';

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const createUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
};

const findUserById = async (userId) => {
    return await User.findById(userId).select("-password");
};

const updateUserVerification = async (email, token) => {
    return await User.findOneAndUpdate(
        { email },
        { verification_token: token },
        { new: true }
    );
};

const verifyUserAccount = async (token) => {
    return await User.findOneAndUpdate(
        { 
            [USER_PROPS.VERIFICATION_TOKEN]: token,
            [USER_PROPS.VERIFIED]: false // Solo actualizar si no está verificado
        },
        { 
            [USER_PROPS.VERIFIED]: true, 
            [USER_PROPS.VERIFICATION_TOKEN]: null 
        },
        { new: true }
    );
};

export { findUserByEmail, createUser, findUserById, updateUserVerification, verifyUserAccount };