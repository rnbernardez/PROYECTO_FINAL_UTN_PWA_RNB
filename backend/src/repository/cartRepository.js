import Cart from "../models/cartModel.js";

const findCartByUserId = async (userId) => {
    return await Cart.findOne({ user: userId });
};

const createCart = async (userId) => {
    const newCart = new Cart({ user: userId, products: [] });
    return await newCart.save();
};

const addCardToUser = async (userId, cardData) => {
    return await User.findByIdAndUpdate(
        userId,
        { $push: { cards: cardData } },
        { new: true }
    );
};

const getUserCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) return null;

    // Calcular el total de la compra
    const total = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return { cart, total };
};

const clearUserCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) return null;

    cart.products = [];
    await cart.save();

    return cart;
};

export { findCartByUserId, createCart, addCardToUser, getUserCart, clearUserCart };