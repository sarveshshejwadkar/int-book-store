import connectDB from '../../models/Mongodb'
import User from '../../models/User'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (username && password) {
        try {
          await User.find({username: username, password: password}, function (err, docs) {
            if (docs.length) return res.status(200).send(docs)
            else return res.status(401).send({message: 'Invalid credentials'});
          });          
        } catch (error) {
          return res.status(500).send(error.message);
        }
      } else {
        res.status(422).send('data_incomplete');
      }
  } else {
    res.status(422).send('req_method_not_supported');
  }
};

export default connectDB(handler);