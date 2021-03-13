import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const supplier = new Schema({
  id: ObjectId,
  name: String,
  phone: String,
  date: Date
});

mongoose.models = {};

const Supplier = mongoose.model('Supplier', supplier);

export default Supplier;
