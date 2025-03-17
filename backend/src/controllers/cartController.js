import Cart from '../models/cartModel.js';
import User, { USER_PROPS } from '../models/userModel.js';

const cartController = async (req, res) => {
    try {
        // Supongo que authMiddleware establece req.user y que contiene el ID del usuario.
        const userId = req.user.id; 
        let cart = await Cart.findOne({ user: userId });
        
      // Si el carrito no existe, se crea uno nuevo.
        if (!cart) {
        cart = new Cart({ user: userId, products: [] });
        await cart.save();
        }
        return res.status(200).json({ ok: true, cart });
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        return res.status(500).json({ ok: false, message: "Error al obtener el carrito", error: error.message });
    }
};

export const addCardController = async (req, res) => {
    try {
      const userId = req.user.id;
      const { cardNumber, expirationDate, cardHolder, cardType } = req.body;
  
      // Validación básica de campos
      if (!cardNumber || !expirationDate || !cardHolder || !cardType) {
        return res.status(400).json({ ok: false, message: "Faltan campos obligatorios para la tarjeta" });
      }
  
      // Actualizar el usuario para agregar la tarjeta al array de tarjetas
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { [USER_PROPS.CARDS]: { cardNumber, expirationDate, cardHolder, cardType } } },
        { new: true }
      );
  
      return res.status(200).json({ ok: true, message: "Tarjeta agregada correctamente", cards: updatedUser[USER_PROPS.CARDS] });
    } catch (error) {
      console.error("Error al agregar la tarjeta:", error);
      return res.status(500).json({ ok: false, message: "Error al agregar la tarjeta", error: error.message });
    }
  };

  export const checkoutController = async (req, res) => {
    try {
      const userId = req.user.id;
      const cart = await Cart.findOne({ user: userId });
      
      if (!cart) {
        return res.status(404).json({ ok: false, message: "Carrito no encontrado" });
      }
  
      // Calcular el total: sumar precio * cantidad de cada item
      let total = 0;
      cart.products.forEach(item => {
        total += item.price * item.quantity;
      });
  
      return res.status(200).json({ ok: true, cart, total });
    } catch (error) {
      console.error("Error en checkout:", error);
      return res.status(500).json({ ok: false, message: "Error al obtener el resumen del carrito", error: error.message });
    }
  };

  export const purchaseOkController = async (req, res) => {
    try {
      const userId = req.user.id;
      const cart = await Cart.findOne({ user: userId });
      
      if (!cart) {
        return res.status(404).json({ ok: false, message: "Carrito no encontrado" });
      }
      
      // Aquí podrías implementar lógica para crear un pedido, actualizar stock, etc.
      // Por simplicidad, simplemente vaciamos el carrito.
      cart.products = [];
      await cart.save();
  
      return res.status(200).json({ ok: true, message: "Compra confirmada y carrito vaciado" });
    } catch (error) {
      console.error("Error al confirmar la compra:", error);
      return res.status(500).json({ ok: false, message: "Error al confirmar la compra", error: error.message });
    }
  };

export { cartController, addCardController, checkoutController, purchaseOkController }