import connectDB from '../../models/Mongodb'
import Cart from '../../models/Cart'

const handler = async (req, res) => {

    const { method } = req

    switch (method) {

        case 'POST':
            const { sessionId, bookId } = req.body;
            try {
                const query = { sessionId: sessionId, book: bookId };
                const result = await Cart.findOneAndUpdate(query, { $inc: {quantity: 1 }})
                if (result)
                    return res.status(200).send(result);
                else {
                    const cart = new Cart({ 
                        sessionId: sessionId,
                        book: bookId,
                        quantity: 1
                    });
                    cart.save(function (err, cart) {
                        if (err) return res.status(401).send({message: 'Could not save'});
                        return res.status(200).send(cart)
                    });
                }
                return res.status(200)
            } catch (error) {
                return res.status(500).send(error.message);
            }
            break;
        
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
    return res.status(200)
};

export default connectDB(handler);