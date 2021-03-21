import connectDB from '../../models/Mongodb'
import Cart from '../../models/Cart'

const stripe = require('stripe')('sk_test_51IXK4EH69SuofnneJn8yYDNWXk4QV2XvXKydVrxuZuwgFcHk3upep1VE9H4BAWTCdhyxMBm8dDsWkiqDWZVcjEcR00rZImC4ln')

const handler = async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    try {
        await Cart.deleteMany({
            sessionId: session.client_reference_id
        })
        return res.status(200)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export default connectDB(handler);