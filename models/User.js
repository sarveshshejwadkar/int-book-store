import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
  id: ObjectId,
  username: String,
  password: String,
  date: Date
});

mongoose.models = {};

const User = mongoose.model('User', user);

export default User;
