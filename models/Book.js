import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const book = new Schema({
  id: ObjectId,
  title: String,
  description: String,
  price: String,
  supplier: String
});

mongoose.models = {};

const Book = mongoose.model('Book', book);

export default Book;
