const Stripe = require('stripe')

const handler = async (req, res) => {

    const { id } = req.query
  
    const stripe = Stripe('sk_test_51IXK4EH69SuofnneJn8yYDNWXk4QV2XvXKydVrxuZuwgFcHk3upep1VE9H4BAWTCdhyxMBm8dDsWkiqDWZVcjEcR00rZImC4ln');

    const session = await stripe.checkout.sessions.retrieve(id);
    await stripe.checkout.sessions.listLineItems(id, function(err, lineItems) {
        if (err) return res.status(401).send({message: 'Could not get item details'});
        return res.status(200).send({
            orderDetails: session,
            lineItems: lineItems
        })
    });
}
export default handler;