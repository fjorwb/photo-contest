const { Photo } = require('../models/index');

module.exports = {
	async getAllPhotos(req, res) {
		const photos = await Photo.findAll({
			attributes: ['id', 'title', 'category', 'description', 'url']
		});

		return res.json(photos);
	},

	async getAllPhotos2(req, res) {
		const photos = await Photo.findAll({
			attributes: ['id', 'title', 'description', 'category', 'category_id']
		});

		return res.json(photos);
	},

	async getAllPhotosData(req, res) {
		const photos = await Photo.findAll({
			attributes: ['id', 'title', 'url'],
			include: [
				{
					association: 'photographer',
					attributes: ['first_name', 'last_name']
				},
				{
					association: 'captions',
					attributes: ['caption', 'id']
				},
				{
					association: 'votes',
					attributes: ['vote']
				}
			]
		});

		return res.json(photos);
	},

	async getAllPhotosCategory(req, res) {
		const photos = await Photo.findAll({
			attributes: ['id', 'title', 'description', 'url'],
			include: [
				{
					association: 'categories',
					attributes: ['id', 'category']
				}
			]
		});
		return res.json(photos);
	},

	async getAllPhotosCategoryByCategoryId(req, res) {
		const { id } = req.params;
		console.log(req.params);
		const photo = await Photo.findAll({
			attributes: ['id', 'title', 'description', 'url'],
			include: [
				{
					association: 'categories',
					attributes: ['id', 'category']
				}
			],
			where: {
				category_id: id
			}
		});
		if (!photo) {
			res.status(404).json({ message: 'No photo/category found' });
		} else {
			return res.status(200).json(photo);
		}
	},

	async getPhotoById(req, res) {
		const photo = await Photo.findByPk(req.params.id, {
			attributes: ['id', 'title', 'category', 'description', 'url'],
			include: [
				{
					association: 'votes',
					attributes: ['vote']
				},
				{
					association: 'fees',
					attributes: ['fee']
				},
				{
					association: 'captions',
					attributes: ['id', 'caption']
				}
			]
		});
		if (!photo) {
			res.status(404).json({ message: 'No photo found' });
		} else {
			return res.status(200).json(photo);
		}
	},

	async getAllCaptionsByPhoto(req, res) {
		const photos = await Photo.findAll({
			include: [
				{
					association: 'captions',
					attributes: ['caption']
				}
			],
			attributes: ['id']
		});

		return res.json(photos);
	},

	async addPhoto(req, res) {
		const { id, title, category, category_id, description, url, user_id } = req.body;
		const photo = await Photo.create({
			id,
			title,
			category,
			category_id,
			description,
			url,
			user_id
		});

		return res.status(201).json(photo);
	},

	async updatePhoto(req, res) {
		const photo = await Photo.findByPk(req.params.id);

		if (!photo) {
			res.status(404).json({ message: 'No photo found' });
		} else {
			await photo.update(req.body, { where: { id: req.params.id } });
			return res.status(200).json({ message: 'Photo updated' });
		}
	},

	async deletePhoto(req, res) {
		const photo = await Photo.findByPk(req.params.id);

		if (!photo) {
			res.status(404).json({ message: 'No photo found' });
		} else {
			await photo.destroy();
			return res.status(200).json({ message: 'Photo deleted' });
		}
	}
};
