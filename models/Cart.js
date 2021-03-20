import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cart = new Schema({
  id: ObjectId,
  sessionId: String,
  bookId: String,
  quantity: Number
});

mongoose.models = {};

const Cart = mongoose.model('Cart', cart);

export default Cart;
