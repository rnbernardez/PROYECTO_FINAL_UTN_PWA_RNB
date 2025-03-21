import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  productId: { // 🔥 Cambiamos 'product' a 'productId'
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: { 
    type: Number, 
    required: true,
    min: 1 
  }
});

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true 
  },
  products: [CartItemSchema] // 🔥 Se elimina `name` y `price`, porque ahora los obtenemos con `populate`
});

const Cart = mongoose.model('Cart', CartSchema);
export default Cart;