const { Inscription } = require('../models/index');

const Sequelize = require('sequelize');

module.exports = {
	async getAllInscriptions(req, res) {
		const inscriptions = await Inscription.findAll({
			attributes: ['fee', 'user_id'],
			include: [
				{
					association: 'user',
					attributes: ['first_name', 'last_name']
				},
				{
					association: 'photo',
					attributes: ['title', 'description', 'category', 'url']
				}
			]
		});

		return res.json(inscriptions);
	},

	async getAllInscriptionsData(req, res) {
		const inscriptions = await Inscription.findAll({
			attributes: ['id', 'fee', 'user_id', 'photo_id', 'paid']
		});

		return res.json(inscriptions);
	},

	async getInscriptionByUserId(req, res) {
		const user_id = req.params.id;

		const inscriptions = await Inscription.findAll({
			attributes: ['user_id', [Sequelize.fn('SUM', Sequelize.col('fee')), 'totalFees']],
			include: [
				// {
				//   association: 'user',
				//   attributes: ['id']
				// },
				// {
				//   association: 'photo',
				//   attributes: ['title', 'description', 'category', 'url']
				// }
			],
			where: { user_id },
			group: ['user_id']
		});

		return res.json(inscriptions);
	},

	async getUnpaidInscriptions(req, res) {
		const inscriptions = await Inscription.findAll({
			attributes: ['id', 'fee', 'user_id'],
			include: [
				{
					association: 'user',
					attributes: ['first_name', 'last_name']
				},
				{
					association: 'photo',
					attributes: ['title', 'description', 'category', 'url']
				}
			],
			where: { paid: false }
		});

		if (!inscriptions) {
			return res.status(400).json({ error: 'No inscriptions found' });
		} else {
			return res.status(200).json(inscriptions);
		}

		// return res.json(inscriptions);
	},
	async getPaidInscriptions(req, res) {
		const inscriptions = await Inscription.findAll({
			attributes: ['id', 'fee', 'user_id'],
			include: [
				{
					association: 'user',
					attributes: ['first_name', 'last_name']
				},
				{
					association: 'photo',
					attributes: ['title', 'description', 'category', 'url']
				}
			],
			where: { paid: true }
		});

		if (!inscriptions) {
			return res.status(400).json({ error: 'No inscriptions found' });
		} else {
			return res.status(200).json(inscriptions);
		}

		// return res.json(inscriptions);
	}
};
