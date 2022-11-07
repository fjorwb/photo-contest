const { Vote } = require('../models/index');

const { Sequelize } = require('sequelize');

module.exports = {
	async getAllVotes(req, res) {
		const votes = await Vote.findAll({
			include: [
				{
					association: 'photo',
					attributes: ['title']
				}
			],
			attributes: ['id', 'photo_id', 'user_id', 'caption_id', 'vote'],
			order: [['id', 'ASC']]
		});

		if (!votes) {
			res.status(404).json({ message: 'No votes found' });
		} else {
			return res.status(200).json(votes);
		}
	},

	async getVotesByPhoto(req, res) {
		const votes = await Vote.findAll({
			attributes: ['photo_id', [Sequelize.fn('SUM', Sequelize.col('vote')), 'totalVotes']],
			// includes: [{
			//   association: 'photo',
			//   attributes: ['title']
			// }],
			order: [[Sequelize.fn('SUM', Sequelize.col('vote')), 'DESC']],
			group: ['photo_id']
		});

		if (!votes) {
			res.status(404).json({ message: 'No votes found' });
		} else {
			return res.status(200).json(votes);
		}
	},

	async addVote(req, res) {
		const { user_id, photo_id, caption_id } = req.body;
		console.log(req.body);

		const vote = await Vote.create({ user_id, photo_id, caption_id, vote: 1 });

		res.status(201).json(vote);
	}
};
