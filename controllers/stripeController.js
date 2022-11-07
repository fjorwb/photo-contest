const stripe = require('stripe')(process.env.STRIPE_KEY);

const calculateOrderAmount = i => {
	// Replace this constant with a calculation of the order's amount
	// Calculate the order total on the server to prevent
	// people from directly manipulating the amount on the client
	const calc = i[0].amount * 100;

	return calc;
};

const stripeX = async (req, res) => {
	const { items } = req.body;

	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: calculateOrderAmount(items),
		currency: 'usd',
		automatic_payment_methods: {
			enabled: true
		}
	});

	res.send({
		clientSecret: paymentIntent.client_secret
	});
};

module.exports = stripeX;
