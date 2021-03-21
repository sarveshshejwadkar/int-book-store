import mongoose from 'mongoose'
import Book from '../models/Book'

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cart = new Schema({
  id: ObjectId,
  sessionId: String,
  book: {type: Schema.Types.ObjectId, ref: Book },
  quantity: Number
});

mongoose.models = {};

const Cart = mongoose.model('Cart', cart);

export default Cart;
