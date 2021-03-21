import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const order = new Schema({
  id: ObjectId,
  paymentId: String,
  date: { type: Date, default: Date.now }
});

mongoose.models = {};

const Order = mongoose.model('Order', order);

export default Order;
