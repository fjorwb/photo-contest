'use strict'
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('inscriptions', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE'
			},
			fee: {
				type: Sequelize.INTEGER
			},
			user_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'photos',
					key: 'id'
				}
			},
			photo_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'photos',
					key: 'id'
				}
			},
			paid: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false
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
		await queryInterface.dropTable('inscriptions')
	}
}
