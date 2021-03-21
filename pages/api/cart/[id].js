import connectDB from '../../../models/Mongodb'
import Cart from '../../../models/Cart'

const handler = async (req, res) => {

    const { method } = req
    const { id } = req.query

    switch (method) {

        case 'GET':
            Cart.find({ sessionId: id })
                .populate('book')
                .exec(function (err, items) {
                    if (err) return res.status(401).send({message: 'Could not get cart items'});
                    return res.status(200).send(items)
                });

            break;
        
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
    return res.status(200)
};

export default connectDB(handler);