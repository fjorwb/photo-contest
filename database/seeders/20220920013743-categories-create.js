'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'categories',
			[
				{ id: 1, category: 'animals', created_at: new Date(), updated_at: new Date() },
				{ id: 2, category: 'architecture', created_at: new Date(), updated_at: new Date() },
				{ id: 3, category: 'buildings', created_at: new Date(), updated_at: new Date() },
				{ id: 4, category: 'fashion', created_at: new Date(), updated_at: new Date() },
				{ id: 5, category: 'food', created_at: new Date(), updated_at: new Date() },
				{ id: 6, category: 'health', created_at: new Date(), updated_at: new Date() },
				{ id: 7, category: 'nature', created_at: new Date(), updated_at: new Date() },
				{ id: 8, category: 'people', created_at: new Date(), updated_at: new Date() },
				{ id: 9, category: 'science', created_at: new Date(), updated_at: new Date() },
				{ id: 10, category: 'sports', created_at: new Date(), updated_at: new Date() },
				{ id: 11, category: 'technology', created_at: new Date(), updated_at: new Date() },
				{ id: 12, category: 'transportation', created_at: new Date(), updated_at: new Date() },
				{ id: 13, category: 'travel', created_at: new Date(), updated_at: new Date() },
				{ id: 14, category: 'urban', created_at: new Date(), updated_at: new Date() }
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('categories', null, {});
	}
};
