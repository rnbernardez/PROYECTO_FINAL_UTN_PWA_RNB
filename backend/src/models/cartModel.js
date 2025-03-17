import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0 
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
    unique: true // Cada usuario tiene un único carrito
  },
  products: [CartItemSchema] // Array de items del carrito
});

const Cart = mongoose.model('Cart', CartSchema);
export default Cart;