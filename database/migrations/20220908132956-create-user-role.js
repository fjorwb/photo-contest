'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('user_roles', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE'
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id'
				}
			},
			role_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'roles',
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
		await queryInterface.dropTable('user_roles')
	}
}
