const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

const sendEmailEthereal = async (req, res) => {
	const { from, subject, text } = req.body;

	let testAccount = await nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: 'jessika.strosin@ethereal.email', // generated ethereal user
			pass: 'PRwQVrJ3dPBxc1wW2K' // generated ethereal password
		}
	});

	let info = await transporter.sendMail({
		from: `${from}`,
		to: 'bar@example.com',
		subject: `${subject}`,
		html: `${text}`
	});

	res.json(info);
};

const sendEmail = async (req, res) => {
	const { from, subject, html } = req.body;

	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	const msg = {
		to: 'fjoliveri.wb@gmail.com', // Change to your recipient
		from: `${from}`, // Change to your verified sender
		subject: `${subject}`,
		text: 'and easy to do anywhere, even with Node.js',
		html: `${html}`
	};

	const info = await sgMail.send(msg);

	res.json(info);
};

module.exports = sendEmail;
