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
    try {
        console.log("Token recibido en repository:", token);
        
        const user = await User.findOneAndUpdate(
            { 
                verification_token: token,
                verified: false           
            },
            { 
                $set: { 
                    verified: true,
                    verification_token: null 
                } 
            },
            { 
                new: true,
                runValidators: true 
            }
        );
        
        console.log("Usuario actualizado:", user);
        return user;
    } catch (error) {
        console.error("Error en verifyUserAccount:", error);
        throw error;
    }
};

export { findUserByEmail, createUser, findUserById, updateUserVerification, verifyUserAccount };