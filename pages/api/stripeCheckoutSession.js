const stripe = require('stripe')('sk_test_51IXK4EH69SuofnneJn8yYDNWXk4QV2XvXKydVrxuZuwgFcHk3upep1VE9H4BAWTCdhyxMBm8dDsWkiqDWZVcjEcR00rZImC4ln')

export default async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'T-shirt',
              },
              unit_amount: 2000,
            },
            quantity: 10,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/cancel',
    });    
    res.json({ id: session.id });
}