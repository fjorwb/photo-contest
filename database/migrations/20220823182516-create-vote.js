'use strict'
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Votes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE'
			},
			vote: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			photo_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'Photos',
					key: 'id'
				}
			},
			user_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id'
				}
			},
			caption_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'Captions',
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
		await queryInterface.dropTable('Votes')
	}
}
