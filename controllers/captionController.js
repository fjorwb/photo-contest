const { Caption } = require('../models/index');

const { Sequelize } = require('sequelize');

module.exports = {
	async getAllCaptions(req, res) {
		const captions = await Caption.findAll({
			include: [
				{
					association: 'photo',
					attributes: ['title']
				}
			],
			attributes: ['id', 'photo_id', 'user_id', 'caption']
		});

		if (!captions) {
			res.status(404).json({ message: 'No captions found' });
		} else {
			return res.status(200).json(captions);
		}
	},
	async getAllCaptionsData(req, res) {
		const captions = await Caption.findAll({
			attributes: ['id', 'caption', 'user_id', 'photo_id']
		});

		if (!captions) {
			res.status(404).json({ message: 'No captions found' });
		} else {
			return res.status(200).json(captions);
		}
	},

	async getCaptionsByPhotoId(req, res) {
		const captions = await Caption.findAll({
			attributes: ['photo_id', 'caption'],
			includes: [
				{
					association: 'photo',
					attributes: ['title']
				}
			],
			order: ['photo_id'],
			group: ['photo_id', 'caption']
		});

		if (!captions) {
			res.status(404).json({ message: 'No captions found' });
		} else {
			return res.status(200).json(captions);
		}
	},

	async addCaption(req, res) {
		let add = await Caption.create(req.body, {});

		if (!add) {
			res.status(400).json({ message: 'Caption not created' });
		} else {
			add.save();
			return res.status(201).json(add);
		}
	},

	async updateCaption(req, res) {
		const update = await Caption.findByPk(req.params.id, {});

		if (!update) {
			res.status(404).json({ message: 'User not found' });
		} else {
			await Caption.update(req.body, { where: { id: req.params.id } });

			return res.status(200).json({ message: 'User updated' });
		}
	},

	async deleteCaption(req, res) {
		const caption = await Caption.findByPk(req.params.id, {});

		if (!caption) {
			res.status(404).json({ message: 'Caption not found' });
		} else {
			await Caption.destroy({ where: { id: req.params.id } });
			return res.status(200).json({ message: 'Caption deleted' });
		}
	}
};
