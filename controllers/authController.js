const { User } = require('../models/index');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');

module.exports = {
	// GET /auth
	login(req, res) {
		const { email, password } = req.body;

		User.findOne({
			where: {
				email: email
			}
		}).then(user => {
			if (!user) {
				return res.status(404).send({
					message: 'User not found'
				});
			}

			const passwordIsValid = bcrypt.compareSync(password, user.password);

			if (!passwordIsValid) {
				return res.status(401).json({ msg: 'Invalid Password!', ok: false });
			}

			const token = jwt.sign({ id: user.id, email: user.email }, authConfig.secret, {
				expiresIn: 86400 // 24 hours
			});

			res.cookie('accessToken', { user_id: user.id, token }, { maxAge: 900000, httpOnly: true });

			res.status(200).json({
				id: user.id,
				email: user.email,
				accessToken: token,
				role: user.role
			});
		});
	},

	register(req, res) {
		const password = bcrypt.hashSync(req.body.password, Number(authConfig.rounds));

		User.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: password,
			address: req.body.address,
			address2: req.body.address2,
			city: req.body.city,
			state: req.body.state,
			zip_code: req.body.zip_code,
			country: req.body.country,
			phone: req.body.phone,
			role: req.body.role
		})
			.then(user => {
				const token = jwt.sign({ user }, authConfig.secret, { expiresIn: authConfig.expiresIn });
				res.status(200).send({ user, token });
			})
			.catch(err => {
				res.status(500).send({ message: err.message });
			});
	}
};
