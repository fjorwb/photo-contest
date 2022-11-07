require('dotenv').config()

module.exports = {
	STRIPE_KEY: process.env.STRIPE_KEY,
	STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
	PORT: process.env.PORT,
	URL: process.env.URL
}
