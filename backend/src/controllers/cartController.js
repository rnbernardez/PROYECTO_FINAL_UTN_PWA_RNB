import Cart from '../models/cartModel.js';
import User, { USER_PROPS } from '../models/userModel.js';
import { findCartByUserId, createCart, addCardToUser, getUserCart, clearUserCart } from '../repositories/cartRepository.js';

const cartController = async (req, res) => {
  try {
      const userId = req.user.id; 

      // Buscar carrito del usuario
      let cart = await findCartByUserId(userId);

      // Si el carrito no existe, crearlo
      if (!cart) {
          cart = await createCart(userId);
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

      // Validación de campos
      if (!cardNumber || !expirationDate || !cardHolder || !cardType) {
          return res.status(400).json({ ok: false, message: "Faltan campos obligatorios para la tarjeta" });
      }

      // Agregar la tarjeta usando la función repository
      const updatedUser = await addCardToUser(userId, { cardNumber, expirationDate, cardHolder, cardType });

      return res.status(200).json({ ok: true, message: "Tarjeta agregada correctamente", cards: updatedUser.cards });
  } catch (error) {
      console.error("Error al agregar la tarjeta:", error);
      return res.status(500).json({ ok: false, message: "Error al agregar la tarjeta", error: error.message });
  }
};

  export const checkoutController = async (req, res) => {
    try {
        const userId = req.user.id;
        const cartData = await getUserCart(userId);

        if (!cartData) {
            return res.status(404).json({ ok: false, message: "Carrito no encontrado" });
        }

        return res.status(200).json({ ok: true, cart: cartData.cart, total: cartData.total });
    } catch (error) {
        console.error("Error en checkout:", error);
        return res.status(500).json({ ok: false, message: "Error al obtener el resumen del carrito", error: error.message });
    }
};

  export const purchaseOkController = async (req, res) => {
    try {
        const userId = req.user.id;
        const updatedCart = await clearUserCart(userId);

        if (!updatedCart) {
            return res.status(404).json({ ok: false, message: "Carrito no encontrado" });
        }

        return res.status(200).json({ ok: true, message: "Compra confirmada y carrito vaciado" });
    } catch (error) {
        console.error("Error al confirmar la compra:", error);
        return res.status(500).json({ ok: false, message: "Error al confirmar la compra", error: error.message });
    }
};

export { cartController, addCardController, checkoutController, purchaseOkController }