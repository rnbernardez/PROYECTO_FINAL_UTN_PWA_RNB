import mongoose from 'mongoose';
import Product from './productModel.js';
import { hashUserMiddleware } from '../middlewares/hashUserMiddleware.js';

const CardSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true },
  expirationDate: { type: String, required: true },
  cardHolder: { type: String, required: true },
  cardType: { type: String, enum: ['Visa', 'MasterCard', 'Macro', 'Other'], required: true }
});

export const USER_PROPS = {
    EMAIL: 'email',
    USERNAME: 'username',
    PASSWORD: 'password',
    ADDRESS: 'address',
    PROFILE_PICTURE: 'profile_picture',
    VERIFIED: 'verified',
    VERIFICATION_TOKEN: 'verification_token',
    IS_SELLING: 'is_selling',
    BOUGHT: 'bought',
    FAVS: 'favs',
    CARDS: 'cards',
    CREATED_AT: 'created_at',
    MODIFIED_AT: 'modified_at',
    ACTIVE: 'active'
}

const UserSchema = new mongoose.Schema(
    {
        [USER_PROPS.EMAIL]: { 
            type: String, 
            required: true, 
            unique: true 
        },
        [USER_PROPS.USERNAME]: { 
            type: String, 
            required: true, 
            unique: true 
        },
        [USER_PROPS.PASSWORD]: {
            type: String, 
            required: true 
        }, 
        [USER_PROPS.ADDRESS]: { 
            type: String, 
            required: true 
        },
        [USER_PROPS.PROFILE_PICTURE]: { 
            type: String 
        }, 
        [USER_PROPS.IS_SELLING]: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product' 
        }], 
        [USER_PROPS.BOUGHT]: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product' 
        }], 
        [USER_PROPS.FAVS]: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product' 
        }], 
        [USER_PROPS.CARDS]: 
            [CardSchema], 
        [USER_PROPS.VERIFIED]: {
                type: Boolean,
                default: false
            },
            [USER_PROPS.VERIFICATION_TOKEN]: {
                type: String
            },
            [USER_PROPS.CREATED_AT]: {
                type: Date,
                default: Date.now
            },
            [USER_PROPS.MODIFIED_AT]: {
                type: Date
            },
            [USER_PROPS.ACTIVE]: {
                type: Boolean,
                default: true
            }  
    },
);

UserSchema.pre('save', hashUserMiddleware);
const User = mongoose.model('User', UserSchema);
export default User;

/*
¿Como verificar una contraseña mas tarde?
const isMatch = await bcrypt.compare(contraseñaIngresada, usuario.password);
*/