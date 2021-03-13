import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
  id: ObjectId,
  name: String,
  email: String,
  username: String,
  password: String,
  date: Date
});

mongoose.models = {};

const User = mongoose.model('User', user);

export default User;
