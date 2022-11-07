const { Category } = require('../models/index');

module.exports = {
	async getAllCategories(req, res) {
		const categories = await Category.findAll({
			attributes: ['id', 'category'],
			order: [['id', 'ASC']]
		});

		if (!categories) {
			res.status(404).json({ message: 'No categories found' });
		} else {
			return res.status(200).json(categories);
		}
	},

	async getAllPhotosData(req, res) {
		const photos = await Category.findAll({
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
		if (!photos) {
			res.status(404).json({ message: 'No photos found' });
		} else {
			return res.status(200).json(photos);
		}
	},

	async getCategoryById(req, res) {
		const category = await Category.findByPk(req.params.id, {
			attributes: ['id', 'category']
		});
		if (!category) {
			res.status(404).json({ message: 'No category found' });
		} else {
			return res.status(200).json(category);
		}
	},

	async addCategory(req, res) {
		const { id, category } = req.body;
		if (!id || !category) {
			return res.status(400).json({ message: 'Please provide a category id and category name' });
		}

		const add = await Category.create({
			id,
			category
		});

		if (!add) {
			res.status(404).json({ message: 'Category not added' });
		} else {
			return res.status(200).json({ message: 'Category added' });
		}
	},

	async updateCategory(req, res) {
		const update = await Category.findByPk(req.params.id, {});

		if (!update) {
			res.status(404).json({ message: 'Category not found' });
		} else {
			await Category.update(req.body, { where: { id: req.params.id } });

			return res.status(200).json({ message: 'Category updated' });
		}
	},

	async deleteCategory(req, res) {
		const category = await Category.findByPk(req.params.id);

		if (!category) {
			res.status(404).json({ message: 'No category found' });
		} else {
			await category.destroy();
			return res.status(200).json({ message: 'Category deleted' });
		}
	}
};
