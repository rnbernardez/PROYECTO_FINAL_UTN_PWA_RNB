import Cart from '../models/cartModel.js';
import User, { USER_PROPS } from '../models/userModel.js';
import { findCartByUserId, createCart, addCardToUser, getUserCart, clearUserCart } from '../repository/cartRepository.js';

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

const addCardController = async (req, res) => {
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

const checkoutController = async (req, res) => {
    try {
        const userId = req.user.id;

        // Obtener los productos y el total del carrito
        const cartData = await getUserCart(userId);

        if (!cartData || !cartData.cart) {
            return res.status(404).json({ ok: false, message: "Carrito no encontrado o vacío" });
        }

        return res.status(200).json({ ok: true, cart: cartData.cart, total: cartData.total });
    } catch (error) {
        console.error("Error en checkout:", error);
        return res.status(500).json({ ok: false, message: "Error al obtener el resumen del carrito", error: error.message });
    }
};

const purchaseOkController = async (req, res) => {
    try {
        const userId = req.user.id;

        // Vaciar el carrito después de la compra
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

const addProductToCartController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        if (!productId || !quantity || quantity <= 0) {
            return res.status(400).json({ ok: false, message: "Producto y cantidad válidos son requeridos" });
        }

        // Verificar si el producto existe
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ ok: false, message: "Producto no encontrado" });
        }

        // Obtener o crear el carrito del usuario
        let cart = await findCartByUserId(userId);
        if (!cart) {
            cart = await createCart(userId);
        }

        // Verificar si el producto ya está en el carrito
        const existingProductIndex = cart.products.findIndex(item => item.productId.toString() === productId);
        
        if (existingProductIndex !== -1) {
            // Si el producto ya está en el carrito, aumentar la cantidad
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            // Si no está, agregarlo
            cart.products.push({ productId, quantity });
        }

        // Guardar cambios en el carrito
        await cart.save();

        return res.status(200).json({ ok: true, message: "Producto agregado al carrito", cart });
    } catch (error) {
        return res.status(500).json({ ok: false, message: "Error al agregar producto al carrito", error: error.message });
    }
};

const removeProductFromCartController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({ ok: false, message: "Se requiere un productId válido" });
        }

        const cart = await findCartByUserId(userId);
        if (!cart) {
            return res.status(404).json({ ok: false, message: "Carrito no encontrado" });
        }

        const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ ok: false, message: "Producto no encontrado en el carrito" });
        }

        if (cart.products[productIndex].quantity > 1) {
            cart.products[productIndex].quantity -= 1;
        } else {
            cart.products.splice(productIndex, 1);
        }

        await cart.save();

        return res.status(200).json({ ok: true, message: "Producto eliminado del carrito correctamente" });
    } catch (error) {
        return res.status(500).json({ ok: false, message: "Error al eliminar el producto del carrito", error: error.message });
    }
};

const clearCartController = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await clearUserCart(userId);

        if (!cart) {
            return res.status(404).json({ ok: false, message: "No se encontró un carrito para este usuario." });
        }

        return res.json({ ok: true, message: "Carrito vaciado con éxito." });
    } catch (error) {
        return res.status(500).json({ ok: false, message: "Error al vaciar el carrito", error: error.message });
    }
};

export { 
    cartController, 
    addCardController, 
    checkoutController, 
    purchaseOkController, 
    addProductToCartController, 
    removeProductFromCartController, 
    clearCartController 
}