import connectDB from '../../models/Mongodb'
import Order from '../../models/Order'
import Cart from '../../models/Cart'

const stripe = require('stripe')('sk_test_51IXK4EH69SuofnneJn8yYDNWXk4QV2XvXKydVrxuZuwgFcHk3upep1VE9H4BAWTCdhyxMBm8dDsWkiqDWZVcjEcR00rZImC4ln')

const handler = async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    try {
        Order.find({ paymentId: session.id }, function (err, order) {
            if (err) return res.status(401).send({message: 'Could not save'});
            if (!order.length) {
                const order = new Order({
                    paymentId: session.id
                })
                order.save( async function (err, order) {
                    if (err) return res.status(401).send({message: 'Could not save'});
                    await Cart.deleteMany({
                        sessionId: session.client_reference_id
                    })
                    return res.status(200).send(order)
                })
            } else {
                return res.status(401).send({message: 'Order Exists'});
            }
        })        
    } catch (error) {
        return res.status(500).send(error.message)
    }
    return res.status(200)
}

export default connectDB(handler);