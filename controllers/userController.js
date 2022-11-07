const bcrypt = require('bcrypt');
const authConfig = require('../config/authConfig');

const { User } = require('../models/index');

module.exports = {
	async getAll(req, res) {
		const users = await User.findAll({
			attributes: [
				'id',
				'first_name',
				'last_name',
				'address',
				'address2',
				'city',
				'state',
				'zip_code',
				'country',
				'phone',
				'email',
				'role'
			]
		});

		if (users.length === 0) {
			res.status(404).json({ message: 'No users found' });
		} else {
			return res.status(200).json(users);
		}
	},

	async getUserById(req, res) {
		const user = await User.findByPk(req.params.id, {
			include: [
				{
					association: 'photos',
					attributes: ['title']
				},
				{
					association: 'fees',
					attributes: ['fee']
				}
			]
		});

		if (!user) {
			res.status(404).json({ message: 'No user found' });
		} else {
			return res.status(200).json(user);
		}
	},

	async getFeesByUserId(req, res) {
		const user = await User.findByPk(req.params.id, {
			attributes: ['id'],
			include: [
				{
					association: 'fees',
					attributes: ['photo_id', 'fee']
				}
			],
			where: { id: req.params.id }
		});

		if (!user) {
			res.status(404).json({ message: 'No user found' });
		} else {
			return res.status(200).json(user);
		}
	},

	async addUser(req, res) {
		const user = await User.findAll({
			attributes: ['email'],
			where: {
				email: req.body.email
			}
		});

		console.log('req.body >>>>>>>>>>>>>>>>>>>>>>>>>>', req.body);

		const {
			first_name,
			last_name,
			address,
			address2,
			city,
			state,
			zip_code,
			country,
			phone,
			email,
			role
		} = req.body;

		const password = bcrypt.hashSync(req.body.password, Number(authConfig.rounds));

		if (user.length > 0) {
			res.status(409).json({ message: 'User already exists' });
		} else {
			const newUser = await User.create({
				first_name,
				last_name,
				address,
				address2,
				city,
				state,
				zip_code,
				country,
				phone,
				email,
				password,
				role
			})
				.then(user => {
					res.status(201).json(user);
				})
				.catch(err => {
					res.status(400).json({ message: err.message });
				});
		}
	},

	async updateUser(req, res) {
		const update = await User.findByPk(req.params.id, {});

		if (!update) {
			res.status(404).json({ message: 'User not found' });
		} else {
			await User.update(req.body, { where: { id: req.params.id } });

			return res.status(200).json({ message: 'User updated' });
		}
	},

	async deleteUser(req, res) {
		const user = await User.findByPk(req.params.id, {});

		if (!user) {
			res.status(404).json({ message: 'User not found' });
		} else {
			await User.destroy({ where: { id: req.params.id } });
			return res.status(200).json({ message: 'User deleted' });
		}
	}
};
