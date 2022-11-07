'use strict'
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('photos', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE'
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING
			},
			description: {
				allowNull: false,
				type: Sequelize.STRING
			},
			category_id: {
				allowNull: true,
				unique: false,
				type: Sequelize.INTEGER
			},
			category: {
				allowNull: true,
				type: Sequelize.STRING
			},
			url: {
				allowNull: false,
				type: Sequelize.STRING
			},
			user_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'users',
					key: 'id'
				}
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE
			}
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('photos')
	}
}
