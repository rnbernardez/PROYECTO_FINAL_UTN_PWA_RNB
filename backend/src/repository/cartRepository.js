import Cart from "../models/cartModel.js";

const findCartByUserId = async (userId) => {
    return await Cart.findOne({ user: userId });
};

const createCart = async (userId) => {
    let existingCart = await Cart.findOne({ user: userId });
    
    if (!existingCart) {
        existingCart = new Cart({ user: userId, products: [] });
        await existingCart.save();
    }

    return existingCart;
};

const addCardToUser = async (userId, cardData) => {
    return await User.findByIdAndUpdate(
        userId,
        { $push: { cards: cardData } },
        { new: true }
    );
};

const getUserCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate("products.productId");

    if (!cart) return null;

    // Calcular el total usando los datos poblados
    const total = cart.products.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0);

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