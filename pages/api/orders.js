const stripe = require('stripe')('sk_test_51IXK4EH69SuofnneJn8yYDNWXk4QV2XvXKydVrxuZuwgFcHk3upep1VE9H4BAWTCdhyxMBm8dDsWkiqDWZVcjEcR00rZImC4ln')

export default async (req, res) => {
    const sessions = await stripe.checkout.sessions.list({
      limit: 10,
    });
    res.status(200).send(sessions)
}